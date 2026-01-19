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
  // show English results toggle (default true)
  let showEnglish = params.get('showEn') === null ? true : params.get('showEn') !== '0';
  // include Japanese results: default true for non-English pages, otherwise controlled by param
  let includeJapanese = isEn ? params.get('includeJa') === '1' : true;
  // filters collapsed state persisted in localStorage
  let filtersCollapsed = (function(){ try { return localStorage.getItem('filtersCollapsed') === '1'; } catch(e){ return false; } })();

  const resultsEl = document.getElementById('results');
  const filtersEl = document.getElementById('filters');

  const strings = {
    ja: {
      noQuery: '検索語が指定されていません。',
      resultsFor: 'に関する検索結果：',
      noResults: 'に一致する情報は見つかりませんでした。',
      show: '表示',
      tagsLabel: 'タグで絞り込む',
      includeJaLabel: '日本語の結果を表示する',
      hideFilters: 'タグを非表示',
      showFilters: 'タグを表示'
    },
    en: {
      noQuery: 'No search term was specified.',
      resultsFor: 'Search results for',
      noResults: 'No results found.',
      show: 'Show',
      tagsLabel: 'Filter by tag',
      includeJaLabel: 'Include Japanese results',
      hideFilters: 'Hide filters',
      showFilters: 'Show filters',
      hideHeading: 'Hide tag label',
      showHeading: 'Show tag label'
    }
  }; 

  const t = isEn ? strings.en : strings.ja;

  function fetchAll() {
    const bases = ['2','7','20','jobs1'];
    return Promise.all(bases.map(base => {
      const pagesFile = jsonPrefix + base + '_pages.json';
      const singleFile = jsonPrefix + base + '.json';
      const dashEnFile = jsonPrefix + base + '-en.json';
      const dashPagesFile = jsonPrefix + base + '-pages.json';
      return fetch(pagesFile)
        .then(r => r.ok ? r.json() :
          fetch(singleFile)
            .then(r2 => r2.ok ? r2.json() :
              fetch(dashEnFile)
                .then(r3 => r3.ok ? r3.json() :
                  fetch(dashPagesFile).then(r4 => r4.ok ? r4.json() : null)
                )
            )
        ).catch(()=>null);
    }))
    .then(arr => {
      const pages = [];
      arr.forEach(obj => {
        if (!obj) return;
        // pages file format
        if (obj.pages && Array.isArray(obj.pages)) pages.push(...obj.pages);
        // if the file itself is an array of pages
        else if (Array.isArray(obj)) pages.push(...obj);
        // single object format
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

  // detect language for a page entry
  function detectLang(p) {
    if (!p) return 'ja';
    if (p.lang) return p.lang;
    const tags = Array.isArray(p.tags) ? p.tags : [];
    if (tags.includes('英語版')) return 'en';
    if (p.url && /\/En[A-Za-z0-9_\-]/.test(p.url)) return 'en';
    if (p.title && /^English[:\s]/i.test(p.title)) return 'en';
    if (p.description && /English/i.test(p.description)) return 'en';
    return 'ja';
  }

  // simple heuristic to detect query language
  function detectQueryLang(q) {
    if (!q) return 'ja';
    // if contains Japanese characters, treat as Japanese
    if (/[ぁ-んァ-ン一-龥]/.test(q)) return 'ja';
    // if contains ASCII letters, treat as English
    if (/[A-Za-z]/.test(q)) return 'en';
    return 'ja';
  }

  // synonyms mapping: maps common queries to equivalent words in other languages
  const SYNONYMS = {
    'onsen': ['温泉','onsen','hot springs'],
    'saisen': ['賽銭','saisen','offering'],
    'manner': ['マナー','manner','manners'],
    'maナー': ['マナー']
  };

  function getSynonyms(q){
    if(!q) return [];
    const key = q.toLowerCase();
    return SYNONYMS[key] || [];
  }

  function renderFilters(tagCounts) {
    filtersEl.innerHTML = `
      <div class="filters-panel ${filtersCollapsed ? 'collapsed' : ''}">
        <div class="filters-heading">${t.tagsLabel} <button type="button" id="toggle-filters" class="filters-toggle" aria-expanded="${filtersCollapsed ? 'false' : 'true'}">${filtersCollapsed ? t.showFilters : t.hideFilters}</button></div>
        <div class="filters-list">${tagCounts.map(([tag,count]) => `
          <label class="filter-tag ${selectedTags.has(tag)?'selected':''}">
            <input type="checkbox" data-tag="${escapeHtml(tag)}" ${selectedTags.has(tag)?'checked':''}>
            <span class="tag-name">${escapeHtml(tag)}</span>
            <span class="tag-count">(${count})</span>
          </label>
        `).join('')}</div>
      </div>
    `;

    // normalize button text/attributes to avoid 'undefined'
    const toggleBtnInit = document.getElementById('toggle-filters');
    if (toggleBtnInit) {
      const showLabel = t.showFilters || (isEn ? 'Show filters' : 'フィルターを表示');
      const hideLabel = t.hideFilters || (isEn ? 'Hide filters' : 'フィルターを閉じる');
      const tText = filtersCollapsed ? showLabel : hideLabel;
      toggleBtnInit.textContent = tText;
      toggleBtnInit.setAttribute('aria-expanded', (!filtersCollapsed).toString());
      toggleBtnInit.setAttribute('type','button');
      toggleBtnInit.setAttribute('title', toggleBtnInit.textContent);
    }


    // attach handlers for checkboxes
    filtersEl.querySelectorAll('input[type=checkbox]').forEach(cb => {
      cb.addEventListener('change', e => {
        const tag = e.target.dataset.tag;
        if (e.target.checked) selectedTags.add(tag); else selectedTags.delete(tag);
        updateUrlParams();
        applyAndRender();
      });
    });

    // clicking the tag label will single-select that tag and show results immediately
    filtersEl.querySelectorAll('.filter-tag').forEach(lbl => {
      lbl.addEventListener('click', e => {
        // ignore clicks directly on the checkbox (handled above)
        if (e.target && e.target.tagName === 'INPUT') return;
        const input = lbl.querySelector('input[type=checkbox]');
        if (!input) return;
        const tag = input.dataset.tag;
        if (!tag) return;
        // if this tag is already the only selected tag, clear selection (toggle off)
        if (selectedTags.size === 1 && selectedTags.has(tag)) {
          selectedTags.clear();
        } else {
          selectedTags = new Set([tag]);
        }
        updateUrlParams();
        applyAndRender();
      });
    });

    // attach toggle handler
    const toggleBtn = document.getElementById('toggle-filters');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', ()=>{
        filtersCollapsed = !filtersCollapsed;
        const panel = filtersEl.querySelector('.filters-panel');
        if (panel) {
          if (filtersCollapsed) panel.classList.add('collapsed'); else panel.classList.remove('collapsed');
        }
        const showLabel = t.showFilters || (isEn ? 'Show filters' : 'フィルターを表示');
        const hideLabel = t.hideFilters || (isEn ? 'Hide filters' : 'フィルターを閉じる');
        toggleBtn.textContent = filtersCollapsed ? showLabel : hideLabel;
        toggleBtn.setAttribute('aria-expanded', (!filtersCollapsed).toString());
        try { localStorage.setItem('filtersCollapsed', filtersCollapsed ? '1' : '0'); } catch(e){}
      });
    }


  }

  function updateUrlParams(){
    const newParams = new URLSearchParams(window.location.search);
    if (query) newParams.set('query', query); else newParams.delete('query');
    if (selectedTags.size) newParams.set('tags', Array.from(selectedTags).join(',')); else newParams.delete('tags');
    // persist showEnglish state
    newParams.set('showEn', showEnglish ? '1' : '0');
    // persist include Japanese option only for English search pages
    if (isEn) {
      if (includeJapanese) newParams.set('includeJa','1'); else newParams.delete('includeJa');
    } else {
      newParams.delete('includeJa');
    }
    const newUrl = location.pathname + (newParams.toString() ? '?' + newParams.toString() : '');
    history.replaceState(null,'',newUrl);
  }

  function applyAndRender() {
    fetchAll().then(pages => {
      console.log('search: pages loaded', pages.length, pages.map(p=>p.title));
      if (!pages || pages.length === 0) {
        console.error('search: no pages loaded');
        resultsEl.innerHTML = `<p>検索データが見つかりません（JSONが読み込めているか確認してください）。</p>`;
        return;
      }
      const q = query.trim().toLowerCase();
      const filtered = pages.filter(p => {
        const syns = getSynonyms(q).map(s=>String(s).toLowerCase());
        const title = p.title ? p.title.toLowerCase() : '';
        const desc = p.description ? p.description.toLowerCase() : '';
        const tags = Array.isArray(p.tags) ? p.tags.map(t=>t.toLowerCase()) : [];

        const matchesQuery = !q || (
          title.includes(q) ||
          desc.includes(q) ||
          tags.some(tag=>tag.includes(q)) ||
          syns.some(s => title.includes(s) || desc.includes(s) || tags.some(tag=>tag.includes(s)))
        );

        const matchesTags = selectedTags.size === 0 || (p.tags && Array.from(selectedTags).every(tg => p.tags.includes(tg)));
        return matchesQuery && matchesTags;
      });

      const tagCounts = buildTagCounts(pages);
      renderFilters(tagCounts);

      if (!query) {
        resultsEl.innerHTML = `<p>${t.noQuery}</p>`;
        return;
      }

      // partition by language
      const jaResults = filtered.filter(p => detectLang(p) === 'ja');
      const enResults = filtered.filter(p => detectLang(p) === 'en');

      if (( !includeJapanese || jaResults.length === 0 ) && (!showEnglish || enResults.length === 0)) {
        console.log('search: no matches', { query, selectedTags: Array.from(selectedTags), totalPages: pages.length });
        resultsEl.innerHTML = `<p>"<span class=\"query-highlight\">${escapeHtml(query)}</span>" ${t.noResults}</p>`;
        return;
      }

      // detect query language and prioritize accordingly
      const qLang = detectQueryLang(query);
      console.log('search: query language', qLang);

      const jaHtml = (includeJapanese && jaResults.length > 0) ? `<section class="results-lang lang-ja"><h3>日本語の検索結果 (${jaResults.length})</h3>` +
        jaResults.map(item => `
          <div class="result-item">
            <h4><a href="${item.url}">${highlight(item.title || '', query)}</a></h4>
            <p class="result-desc">${highlight(item.description || '', query)}</p>
            <div class="result-tags">${(item.tags||[]).map(tag=>`<span class="result-tag">${escapeHtml(tag)}</span>`).join(' ')}</div>
          </div>
        `).join('') + `</section>` : '';

      const enHtml = (showEnglish && enResults.length > 0) ? `<section class="results-lang lang-en"><h3>English results (${enResults.length})</h3>` +
        enResults.map(item => `
          <div class="result-item">
            <h4><a href="${item.url}">${highlight(item.title || '', query)}</a></h4>
            <p class="result-desc">${highlight(item.description || '', query)}</p>
            <div class="result-tags">${(item.tags||[]).map(tag=>`<span class="result-tag">${escapeHtml(tag)}</span>`).join(' ')}</div>
          </div>
        `).join('') + `</section>` : '';

      let html = `<p>"<span class=\"query-highlight\">${escapeHtml(query)}</span>" ${t.resultsFor}</p>`;

      if (qLang === 'en') {
        // prioritize English
        if (enHtml) html += enHtml;
        if (jaHtml) html += jaHtml;
      } else {
        // default: Japanese first
        if (jaHtml) html += jaHtml;
        if (enHtml) html += enHtml;
      }

      resultsEl.innerHTML = html;
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
      <div class="checkboxes">
        <label class="chk-line"><input id="show-en" type="checkbox" ${showEnglish? 'checked':''}> ${isEn? 'Show English results':'英語の結果を表示'}</label>
        ${isEn ? `<label class="chk-line"><input id="include-ja" type="checkbox" ${includeJapanese ? 'checked' : ''}> ${t.includeJaLabel}</label>` : ''}
      </div>
    `;
    filtersEl.parentNode.insertBefore(container, filtersEl);
    document.getElementById('srch-btn').addEventListener('click', ()=>{
      query = document.getElementById('srch-input').value.trim();
      updateUrlParams();
      applyAndRender();
    });
    document.getElementById('srch-input').addEventListener('keypress', (e)=>{ if(e.key==='Enter'){ query = e.target.value.trim(); updateUrlParams(); applyAndRender(); }});
    const showEnEl = document.getElementById('show-en');
    if (showEnEl) showEnEl.addEventListener('change', (e)=>{
      showEnglish = e.target.checked;
      updateUrlParams();
      applyAndRender();
    });
    if (isEn) {
      const inc = document.getElementById('include-ja');
      if (inc) inc.addEventListener('change', (e)=>{ includeJapanese = e.target.checked; updateUrlParams(); applyAndRender(); });
    }
  }

  // init
  renderSearchInput();
  applyAndRender();
})();