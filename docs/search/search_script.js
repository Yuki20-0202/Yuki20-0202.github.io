(function(){
  // Detect locale (search-en pages are under /search-en/)
  const isEn = location.pathname.includes('/search-en/');
  const jsonPrefix = isEn ? '/search-en/' : '/search/';

  const jsonFiles = [
    jsonPrefix + '2_pages.json',
    jsonPrefix + '7_pages.json',
    jsonPrefix + '20_pages.json',
    jsonPrefix + 'jobs1_pages.json'
  ];

  const params = new URLSearchParams(window.location.search);
  let query = params.get('query')?.trim() || '';
  let tagParam = params.get('tags') || '';
  let selectedTags = new Set(tagParam ? tagParam.split(',').filter(Boolean) : []);

  const resultsEl = document.getElementById('results');
  const filtersEl = document.getElementById('filters');

  const strings = {
    ja: {
      noQuery: '検索語が指定されていません。',
      resultsFor: 'に関する検索結果：',
      noResults: 'に一致する情報は見つかりませんでした。',
      show: '表示',
      tagsLabel: 'タグで絞り込む'
    },
    en: {
      noQuery: 'No search term was specified.',
      resultsFor: 'Search results for',
      noResults: 'No results found.',
      show: 'Show',
      tagsLabel: 'Filter by tag'
    }
  };

  const t = isEn ? strings.en : strings.ja;

  function fetchAll() {
    return Promise.all(jsonFiles.map(f => fetch(f).then(r => r.ok ? r.json() : Promise.resolve(null)).catch(()=>null)))
      .then(arr => {
        const pages = [];
        arr.forEach(obj => {
          if (!obj) return;
          if (obj.pages && Array.isArray(obj.pages)) pages.push(...obj.pages);
          // backward compatibility: handle old single-object files
          else if (obj.title) pages.push(obj);
        });
        return pages;
      });
  }

  function buildTagCounts(pages) {
    const counts = new Map();
    pages.forEach(p => { if (Array.isArray(p.tags)) p.tags.forEach(tag => counts.set(tag, (counts.get(tag)||0)+1)); });
    return Array.from(counts.entries()).sort((a,b)=>b[1]-a[1]);
  }

  function highlight(text, q) {
    if (!q) return escapeHtml(text);
    const re = new RegExp('('+escapeRegExp(q)+')','ig');
    return escapeHtml(text).replace(re, '<span class="query-highlight">$1</span>');
  }

  function escapeHtml(s){ return (s+'').replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
  function escapeRegExp(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }

  function renderFilters(tagCounts) {
    filtersEl.innerHTML = `
      <div class="filters-panel">
        <div class="filters-heading">${t.tagsLabel}</div>
        <div class="filters-list">${tagCounts.map(([tag,count]) => `
          <label class="filter-tag ${selectedTags.has(tag)?'selected':''}">
            <input type="checkbox" data-tag="${escapeHtml(tag)}" ${selectedTags.has(tag)?'checked':''}>
            <span class="tag-name">${escapeHtml(tag)}</span>
            <span class="tag-count">(${count})</span>
          </label>
        `).join('')}</div>
      </div>
    `;

    // attach handlers
    filtersEl.querySelectorAll('input[type=checkbox]').forEach(cb => {
      cb.addEventListener('change', e => {
        const tag = e.target.dataset.tag;
        if (e.target.checked) selectedTags.add(tag); else selectedTags.delete(tag);
        updateUrlParams();
        applyAndRender();
      });
    });
  }

  function updateUrlParams(){
    const newParams = new URLSearchParams(window.location.search);
    if (query) newParams.set('query', query); else newParams.delete('query');
    if (selectedTags.size) newParams.set('tags', Array.from(selectedTags).join(',')); else newParams.delete('tags');
    const newUrl = location.pathname + '?' + newParams.toString();
    history.replaceState(null,'',newUrl);
  }

  function applyAndRender() {
    fetchAll().then(pages => {
      const q = query.trim().toLowerCase();
      const filtered = pages.filter(p => {
        const matchesQuery = !q || ( (p.title && p.title.toLowerCase().includes(q)) || (p.description && p.description.toLowerCase().includes(q)) || (p.tags && p.tags.some(tag=>tag.toLowerCase().includes(q))) );
        const matchesTags = selectedTags.size === 0 || (p.tags && Array.from(selectedTags).every(tg => p.tags.includes(tg)));
        return matchesQuery && matchesTags;
      });

      const tagCounts = buildTagCounts(pages);
      renderFilters(tagCounts);

      if (!query) {
        resultsEl.innerHTML = `<p>${t.noQuery}</p>`;
        return;
      }

      if (filtered.length === 0) {
        resultsEl.innerHTML = `<p>"<span class=\"query-highlight\">${escapeHtml(query)}</span>" ${t.noResults}</p>`;
        return;
      }

      resultsEl.innerHTML = `<p>"<span class=\"query-highlight\">${escapeHtml(query)}</span>" ${t.resultsFor}</p>` +
        filtered.map(item => `
          <div class="result-item">
            <h3><a href="${item.url}">${highlight(item.title || '', query)}</a></h3>
            <p class="result-desc">${highlight(item.description || '', query)}</p>
            <div class="result-tags">${(item.tags||[]).map(tag=>`<span class="result-tag">${escapeHtml(tag)}</span>`).join(' ')}</div>
          </div>
        `).join('');
    }).catch(err => {
      console.error('Failed to load pages', err);
      resultsEl.innerHTML = `<p>${isEn? 'Failed to load search data.':'検索データの読み込みに失敗しました。'}</p>`;
    });
  }

  // small search input to refine
  function renderSearchInput(){
    const container = document.createElement('div');
    container.className = 'search-input-panel';
    container.innerHTML = `
      <input id="srch-input" type="search" value="${escapeHtml(query)}" placeholder="${isEn? 'Search...':'検索ワードを入力'}">
      <button id="srch-btn">${isEn? 'Search':'検索'}</button>
    `;
    filtersEl.parentNode.insertBefore(container, filtersEl);
    document.getElementById('srch-btn').addEventListener('click', ()=>{
      query = document.getElementById('srch-input').value.trim();
      updateUrlParams();
      applyAndRender();
    });
    document.getElementById('srch-input').addEventListener('keypress', (e)=>{ if(e.key==='Enter'){ query = e.target.value.trim(); updateUrlParams(); applyAndRender(); }});
  }

  // init
  renderSearchInput();
  applyAndRender();
})();