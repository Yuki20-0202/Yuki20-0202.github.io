// 翻訳データ（辞書）
const translations = {
    ja: {
        // --- 共通ボタン ---
        btn_label: "English",
        btn_back_home: "文化TOP",

        // --- TOPページ ---
        title: "日本の文化TOP",
        btn_manner: "日本のマナー",
        btn_travel: "日本の観光",
        manner_title: "マナーガイドについて",
        manner_desc: "日本独特の礼儀作法や、生活のマナーについて詳しく解説します。",
        manner_list_1: "食事の挨拶",
        manner_list_2: "お箸の正しい持ち方や使い方",
        manner_list_3: "銭湯での入り方",
        manner_list_4: "靴を脱ぐ場所",
        manner_list_5: "電車での過ごし方",
        manner_list_6: "賽銭のやり方",
        
        travel_title: "観光ガイドについて",
        travel_desc: "有名な観光地から、地元の人しか知らない穴場スポットまで紹介します。",
        travel_list_1: "都道府県ごとのおすすめスポット",
        travel_list_2: "ジャンルごとのおすすめスポット",
        travel_list_3: "季節ごとのイベント情報",

        // --- ★ここから追加：マナーガイドページ ---
        manner_page_title: "日本のマナーガイド",
        manner_heading: "知っておきたい日本の習慣",
        manner_desc: "これを知っていれば、もっと日本を楽しめます。",
        // カード1: 食事の挨拶
        m_card_1_title: "食事の挨拶",
        m_card_1_desc: "食事の挨拶「いただきます」「ごちそうさまでした」について",
        // カード2: お箸
        m_card_2_title: "お箸",
        m_card_2_desc: "お箸の正しい持ち方や使い方について",
        // カード3: 温泉
        m_card_3_title: "温泉・銭湯",
        m_card_3_desc: "温泉・銭湯の入り方について",
        // カード4: 靴
        m_card_4_title: "靴",
        m_card_4_desc: "靴を脱ぐ場所について",
        // カード5: 電車
        m_card_5_title: "電車",
        m_card_5_desc: "電車での過ごし方について",
        // カード6: 賽銭
        m_card_6_title: "賽銭",
        m_card_6_desc: "賽銭のやり方について",

        // --- ★ここから追加：食事の挨拶ページ (Enitada.html) ---
        itada_page_title: "食事の挨拶",
        itada_heading: "感謝を込めて食事をしよう",
        itada_desc: "日本では、食事の前後に手を合わせて感謝の言葉を言います。",
        
        // いただきます
        itada_label_before: "食事の前",
        itada_1_title: "「いただきます」",
        itada_meaning_label: "言葉の意味",
        itada_1_mean: "「あなたの命をいただきます」という意味です。食材となった植物や動物の命、そして料理を作ってくれた人への感謝を表します。",
        itada_howto_label: "やり方",
        itada_1_step1: "胸の前で両手を合わせます。",
        itada_1_step2: "「いただきます」とはっきり言います。",
        itada_1_step3: "軽くお辞儀をしてから食べ始めます。",

        // ごちそうさまでした
        itada_label_after: "食事の後",
        itada_2_title: "「ごちそうさまでした」",
        itada_meaning_label_2: "言葉の意味",
        itada_2_mean: "「食事を用意するために走り回ってくれてありがとう」という意味です。食材を育てた人、運んだ人、料理した人の労力に感謝します。",
        itada_howto_label_2: "やり方",
        itada_2_step1: "箸を置き、食事を終えます。",
        itada_2_step2: "もう一度、両手を合わせます。",
        itada_2_step3: "「ごちそうさまでした」と言って軽く一礼します。",

        // --- ★ここから追加：お箸のマナーページ (Enohasi.html) ---
        ohasi_page_title: "お箸のマナー",
        ohasi_heading: "美しいお箸の使い方",
        ohasi_desc: "お箸を正しく使えると、食事がもっと美味しく、美しくなります。",
        
        // 正しい持ち方
        ohasi_hold_title: "正しい持ち方",
        ohasi_step_1: "上の1本は、鉛筆を持つように人差し指と中指で挟みます。",
        ohasi_step_2: "下の1本は、薬指の爪の横に置いて固定します。",
        ohasi_step_3: "動かすのは「上の1本」だけです。下のお箸は動かしません。",
        
        // やってはいけないこと
        ohasi_taboo_title: "やってはいけないこと",
        ohasi_taboo_desc: "これらはマナー違反とされています。",
        taboo_1_name: "刺し箸", taboo_1_desc: "食べ物にお箸を突き刺して食べること。",
        taboo_2_name: "箸渡し", taboo_2_desc: "お箸からお箸へ、食べ物を受け渡すこと。（骨拾いと同じ動作のためNG）",
        taboo_3_name: "寄せ箸", taboo_3_desc: "食器をお箸で手元に引き寄せること。",
        taboo_4_name: "迷い箸", taboo_4_desc: "「どれを食べようかな」とお箸を持ったまま料理の上で迷うこと。",
        
        //--- ★ここから追加：温泉・銭湯 (Ensentou.html) ---
        sentou_page_title: "温泉・銭湯の入り方",
        sentou_heading: "心も体もリラックス",
        sentou_desc: "みんなが気持ちよく使うための、入浴の基本ステップを紹介します。",
        
        // 流れ
        sentou_flow_title: "入浴の流れ",
        flow_1_title: "服を脱ぐ", flow_1_desc: "脱衣所で服をすべて脱ぎます。水着や下着を着たまま入るのは禁止です。",
        flow_2_title: "体を洗う", flow_2_desc: "湯船に入る前に、洗い場で髪と体をきれいに洗います。シャワーのしぶきが隣の人にかからないように注意しましょう。",
        flow_3_title: "湯船につかる", flow_3_desc: "ゆっくりとお湯につかります。タオルをお湯の中に入れてはいけません。頭に乗せるか、端に置きましょう。",
        flow_4_title: "体を拭く", flow_4_desc: "脱衣所に戻る前に、濡れた体をタオルで軽く拭きましょう。床を濡らさないためのマナーです。",
        
        // ルール
        sentou_rule_title: "知っておくべきルール",
        rule_1_title: "入れ墨（タトゥー）について", rule_1_desc: "日本の多くの温泉・銭湯では、入れ墨（タトゥー）がある方の入浴をお断りしています。小さなものであれば、シールで隠せば入れる場合もあります。",
        rule_2_title: "長い髪は結ぶ", rule_2_desc: "髪の毛がお湯につからないように、ゴムやクリップでまとめておきましょう。",
        rule_3_title: "泳がない", rule_3_desc: "湯船はプールではありません。泳いだり飛び込んだりせず、静かに過ごしましょう。",

        // --- ★ここから追加：靴のマナー (Enkutu.html) ---
        kutu_page_title: "靴のマナー",
        kutu_heading: "どこで靴を脱ぐ？",
        kutu_desc: "日本には、部屋を清潔に保つために靴を脱ぐ文化があります。",
        kutu_list_title: "主な場所",
        
        // 場所リスト
        place_1_title: "家・玄関", place_1_desc: "日本の家では必ず玄関で靴を脱ぎます。「上がり框（あがりかまち）」という段差が境界線です。",
        place_2_title: "座敷のあるお店", place_2_desc: "居酒屋や日本料理店で、畳の席（座敷）に上がるときは靴を脱ぎます。",
        place_3_title: "寺社の建物内", place_3_desc: "庭を歩くときは靴のままで大丈夫ですが、本堂など建物の中に入るときは靴を脱ぎます。",
        place_4_title: "旅館", place_4_desc: "入り口（玄関）で靴を脱いで、館内用のスリッパに履き替えることが多いです。",
        place_5_title: "茶室", place_5_desc: "茶道を行う茶室では必ず靴を脱ぎます。白い靴下を履くのが正式なマナーです。",
        place_6_title: "試着室", place_6_desc: "服屋さんの試着室（フィッティングルーム）の中も、靴を脱いで利用します。",

        // Tips
        tip_title: "スマートな脱ぎ方",
        tip_desc: "脱いだ靴は、つま先をドア（外）の方に向けて揃えて置きます。これを「靴を揃える」と言い、美しいマナーとされています。",
        tip_door: "ドア（外）",

        // --- ★ここから追加：電車マナー (Endensya.html) ---
        densya_page_title: "電車でのマナー",
        densya_heading: "みんなで快適に移動しよう",
        densya_desc: "日本の電車内では「周りの人に迷惑をかけない」ことが最も大切です。",
        densya_rule_title: "車内の基本ルール",
        
        // 基本ルール
        d_rule_1_title: "携帯電話・スマホ", d_rule_1_desc: "マナーモードに設定し、通話は控えましょう。動画や音楽はイヤホンをして音漏れに注意します。",
        d_rule_2_title: "整列乗車", d_rule_2_desc: "ホームでは列に並んで待ちます。降りる人が全員降りてから乗り込みましょう。",
        d_rule_3_title: "大きな荷物", d_rule_3_desc: "リュックサックは前に抱えるか、網棚に置きます。通路を塞がないように配慮しましょう。",
        d_rule_4_title: "飲食について", d_rule_4_desc: "新幹線などを除き、普通の電車内で食事をするのは控えましょう。飲み物はOKです。",

        // 優先席
        priority_title: "優先席 (Priority Seat)",
        priority_desc: "お年寄り、体の不自由な方、妊娠中の方、小さなお子様連れの方のための席です。ステッカーが貼ってある席は、必要な人に譲りましょう。",

        // --- ★ここから追加：賽銭・参拝 (Ensaisen.html) ---
        saisen_page_title: "参拝の作法",
        saisen_heading: "神様へのご挨拶",
        saisen_desc: "神社にお参りする時の、基本的な手順と礼儀を紹介します。",
        
        // 準備
        saisen_step_title: "拝礼の前に",
        prep_1_title: "お賽銭を入れる", prep_1_desc: "投げずに、そっと賽銭箱に入れます。「ご縁がありますように」と5円玉を入れるのが人気です。",
        prep_2_title: "鈴を鳴らす", prep_2_desc: "鈴がある場合は、紐を振って鳴らします。この音で身を清め、神様をお呼びします。",

        // 二礼二拍手一礼
        ritual_title: "二礼 二拍手 一礼",
        ritual_sub: "これが基本の拝礼作法です。",
        badge_2_bows: "2回",
        rit_1_title: "二礼（にれい）", rit_1_desc: "神様に向かって、深く2回お辞儀をします。",
        badge_2_claps: "2回",
        rit_2_title: "二拍手（にはくしゅ）", rit_2_desc: "胸の高さで手を合わせ、2回手を打ちます。その後、手を合わせてお祈りします。",
        badge_1_bow: "1回",
        rit_3_title: "一礼（いちれい）", rit_3_desc: "最後に感謝を込めて、もう一度深くお辞儀をします。"
    
    },
    en: {
        // --- 共通ボタン ---
        btn_label: "日本語",
        btn_back_home: "Culture TOP",

        // --- TOPページ ---
        title: "JAPAN CULTURE TOP",
        btn_manner: "Manner Guide",
        btn_travel: "Travel Guide",
        manner_title: "About Manner Guide",
        manner_desc: "Learn about Japanese unique etiquette and daily manners.",
        manner_list_1: "Meal greetings",
        manner_list_2: "How to hold and use chopsticks correctly",
        manner_list_3: "How to take a public bath",
        manner_list_4: "Where to take off shoes",
        manner_list_5: "How to spend time on the train",
        manner_list_6: "How to offer money (Saisen)",
        
        travel_title: "About Travel Guide",
        travel_desc: "Introducing famous tourist spots and local hidden gems.",
        travel_list_1: "Recommended spots by prefecture",
        travel_list_2: "Recommended spots by genre",
        travel_list_3: "Seasonal event information",

        // --- ★ここから追加：マナーガイドページ ---
        manner_page_title: "Japanese Manner Guide",
        manner_heading: "Customs to Know",
        manner_desc: "Knowing these will help you enjoy Japan more.",
        // Card 1: Greetings
        m_card_1_title: "Meal Greetings",
        m_card_1_desc: "SAbout Meal Greetings: “Itadakimasu” and “Gochisousama deshita”",
        // Card 2: Chopsticks
        m_card_2_title: "Chopsticks",
        m_card_2_desc: "The Proper Way to Hold and Use Chopsticks",
        // Card 3: Onsen
        m_card_3_title: "Onsen & Sento",
        m_card_3_desc: "How to Use Hot Springs and Public Bathhouses",
        // Card 4: Shoes
        m_card_4_title: "Shoes",
        m_card_4_desc: "Where to Take Off Shoes",
        // Card 5: Train
        m_card_5_title: "Train",
        m_card_5_desc: "How to Spend Time on the Train",
        // Card 6: Saisen
        m_card_6_title: "Offering Money (Saisen)",
        m_card_6_desc: "How to Offer Money at Shrines",

        // --- ★Additions: Meal Greetings (Enitada.html) ---
        itada_page_title: "Meal Greetings",
        itada_heading: "Dining with Gratitude",
        itada_desc: "In Japan, people put their hands together and say words of gratitude before and after meals.",

        // Itadakimasu
        itada_label_before: "Before Meal",
        itada_1_title: "'Itadakimasu'",
        itada_meaning_label: "Meaning",
        itada_1_mean: "It means 'I humbly receive your life.' It expresses gratitude for the lives of plants and animals, and to the person who cooked the meal.",
        itada_howto_label: "How to do",
        itada_1_step1: "Put your hands together in front of your chest.",
        itada_1_step2: "Say 'Itadakimasu' clearly.",
        itada_1_step3: "Bow slightly before starting to eat.",

        // Gochisousama
        itada_label_after: "After Meal",
        itada_2_title: "'Gochisousama-deshita'",
        itada_meaning_label_2: "Meaning",
        itada_2_mean: "It means 'Thank you for running around to prepare this.' We thank the farmers, transporters, and cooks for their hard work.",
        itada_howto_label_2: "How to do",
        itada_2_step1: "Put down your chopsticks and finish your meal.",
        itada_2_step2: "Put your hands together again.",
        itada_2_step3: "Say 'Gochisousama-deshita' and bow slightly.",

        // --- ★Additions: Chopsticks Manner (Enohasi.html) ---
        ohasi_page_title: "Chopstick Manners",
        ohasi_heading: "Beautiful Chopstick Use",
        ohasi_desc: "Using chopsticks correctly makes the meal delicious and beautiful.",
        
        // How to hold
        ohasi_hold_title: "How to Hold",
        ohasi_step_1: "Hold the top stick like a pencil with index and middle fingers.",
        ohasi_step_2: "Place the bottom stick at the base of your ring finger to fix it.",
        ohasi_step_3: "Move ONLY the top stick. The bottom stick stays still.",
        
        // Taboos
        ohasi_taboo_title: "Don'ts (Taboos)",
        ohasi_taboo_desc: "These actions are considered bad manners.",
        taboo_1_name: "Sashi-bashi", taboo_1_desc: "Spearing food with chopsticks.",
        taboo_2_name: "Hashi-watashi", taboo_2_desc: "Passing food from chopstick to chopstick. (Resembles funeral rites)",
        taboo_3_name: "Yose-bashi", taboo_3_desc: "Pulling a dish closer with chopsticks.",
        taboo_4_name: "Mayoi-bashi", taboo_4_desc: "Hovering chopsticks over dishes while deciding what to eat.",

        // --- ★Additions: Onsen/Sento (Ensentou.html) ---
        sentou_page_title: "How to take Onsen",
        sentou_heading: "Relax Body and Mind",
        sentou_desc: "Here are the basic steps for bathing so everyone can use it comfortably.",
        
        // Flow
        sentou_flow_title: "Bathing Flow",
        flow_1_title: "Take off clothes", flow_1_desc: "Take off all clothes in the changing room. Wearing swimsuits or underwear is prohibited.",
        flow_2_title: "Wash your body", flow_2_desc: "Wash your hair and body thoroughly before entering the bathtub. Be careful not to splash others.",
        flow_3_title: "Soak in the bath", flow_3_desc: "Relax in the hot water. Do not put your towel in the water. Put it on your head or set it aside.",
        flow_4_title: "Dry your body", flow_4_desc: "Lightly dry your body with a towel before returning to the changing room to keep the floor dry.",
        
        // Rules
        sentou_rule_title: "Rules to Know",
        rule_1_title: "About Tattoos", rule_1_desc: "Many Onsens in Japan prohibit entry for those with tattoos. If it is small, you may be allowed to enter by covering it with a seal.",
        rule_2_title: "Tie up long hair", rule_2_desc: "Tie up your hair with a rubber band or clip so it doesn't soak in the water.",
        rule_3_title: "Do not swim", rule_3_desc: "The bathtub is not a swimming pool. Do not swim or jump, just stay quiet.",

        
        // --- ★Additions: Shoes (Enkutu.html) ---
        kutu_page_title: "Shoe Manners",
        kutu_heading: "Where to Take Off Shoes?",
        kutu_desc: "Japan has a culture of taking off shoes to keep rooms clean.",
        kutu_list_title: "Main Places",
        
        // Place List
        place_1_title: "Home / Genkan", place_1_desc: "Always take off shoes at the entrance (Genkan). The step (Agarikamachi) is the boundary.",
        place_2_title: "Restaurants with Tatami", place_2_desc: "Take off shoes when going up to Tatami seats at Izakayas or Japanese restaurants.",
        place_3_title: "Temples / Shrines", place_3_desc: "You can walk in the garden with shoes, but take them off when entering buildings like the Main Hall.",
        place_4_title: "Ryokan (Inn)", place_4_desc: "Often you take off shoes at the entrance and change into slippers for inside.",
        place_5_title: "Tea Ceremony Room", place_5_desc: "Always take off shoes in a Tea Room. Wearing white socks is the formal manner.",
        place_6_title: "Fitting Room", place_6_desc: "Take off your shoes when using fitting rooms in clothing stores.",

        // Tips
        tip_title: "Smart Way to Take Off",
        tip_desc: "Arrange your shoes with the toes pointing towards the door (outside). This is considered beautiful manners.",
        tip_door: "Door (Outside)",

        // --- ★Additions: Train Manners (Endensya.html) ---
        densya_page_title: "Train Manners",
        densya_heading: "Travel Comfortably",
        densya_desc: "In Japanese trains, 'not disturbing others' is the most important rule.",
        densya_rule_title: "Basic Rules",
        
        // Basic Rules
        d_rule_1_title: "Mobile Phones", d_rule_1_desc: "Set to silent mode and refrain from talking. Use headphones for music/videos to prevent sound leakage.",
        d_rule_2_title: "Queuing", d_rule_2_desc: "Line up on the platform. Let passengers off before getting on.",
        d_rule_3_title: "Luggage", d_rule_3_desc: "Hold backpacks in front or put them on the rack. Do not block the aisle.",
        d_rule_4_title: "Eating & Drinking", d_rule_4_desc: "Avoid eating in regular trains (except Shinkansen). Drinking is okay.",

        // Priority Seats
        priority_title: "Priority Seat",
        priority_desc: "These seats are for the elderly, disabled, pregnant women, and those with young children. Please offer your seat if you see someone in need.",

        // --- ★Additions: Saisen (Ensaisen.html) ---
        saisen_page_title: "Visiting Shrines",
        saisen_heading: "Greeting the Gods",
        saisen_desc: "Here are the basic steps and etiquette for visiting a shrine.",
        
        // Prep
        saisen_step_title: "Before Praying",
        prep_1_title: "Offer Money (Saisen)", prep_1_desc: "Put money in gently. 5 yen coins are popular for 'Good Connections'.",
        prep_2_title: "Ring the Bell", prep_2_desc: "If there is a bell, ring it to purify yourself and call the gods.",

        // Ritual
        ritual_title: "2 Bows, 2 Claps, 1 Bow",
        ritual_sub: "This is the basic ritual.",
        badge_2_bows: "2 times",
        rit_1_title: "2 Bows (Ni-rei)", rit_1_desc: "Bow deeply twice toward the deity.",
        badge_2_claps: "2 times",
        rit_2_title: "2 Claps (Ni-hakushu)", rit_2_desc: "Clap your hands twice at chest level. Then, pray with hands together.",
        badge_1_bow: "1 time",
        rit_3_title: "1 Bow (Ichi-rei)", rit_3_desc: "Bow deeply one last time with gratitude."
    }
};

let currentLang = 'ja';
const langBtn = document.getElementById('lang-btn');

if (langBtn) {
    langBtn.addEventListener('click', () => {
        if (currentLang === 'ja') {
            currentLang = 'en';
        } else {
            currentLang = 'ja';
        }
        updateText();
    });
}

// 安全に文字を書き換える関数
function setText(id, text) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = text;
    }
}

function updateText() {
    const data = translations[currentLang];

    // --- 共通 ---
    setText('lang-btn', data.btn_label);
    setText('btn-back-home', data.btn_back_home);

    // --- TOPページ ---
    setText('title', data.title);
    setText('btn-manner', data.btn_manner);
    setText('btn-travel', data.btn_travel);
    setText('manner-title', data.manner_title);
    setText('manner-desc', data.manner_desc);
    for (let i = 1; i <= 6; i++) setText(`manner-list-${i}`, data[`manner_list_${i}`]);
    setText('travel-title', data.travel_title);
    setText('travel-desc', data.travel_desc);
    for (let i = 1; i <= 3; i++) setText(`travel-list-${i}`, data[`travel_list_${i}`]);

    // --- 観光ページ ---
    setText('kankou-title', data.kankou_title);
    setText('main-heading', data.main_heading);
    setText('main-desc', data.main_desc);
    // (都道府県の更新処理もここに残っています)

    // --- ★ここから追加：マナーページ ---
    setText('manner-page-title', data.manner_page_title);
    setText('manner-heading', data.manner_heading);
    setText('manner-desc', data.manner_desc);
    for (let i = 1; i <= 6; i++) {
        setText(`m-card-${i}-title`, data[`m_card_${i}_title`]);
        setText(`m-card-${i}-desc`, data[`m_card_${i}_desc`]);
    }
    // ★食事の挨拶ページ
    setText('itada-page-title', data.itada_page_title);
    setText('itada-heading', data.itada_heading);
    setText('itada-desc', data.itada_desc);
    setText('itada-label-before', data.itada_label_before);
    setText('itada-1-title', data.itada_1_title);
    setText('itada-meaning-label', data.itada_meaning_label);
    setText('itada-1-mean', data.itada_1_mean);
    setText('itada-howto-label', data.itada_howto_label);
    setText('itada-1-step1', data.itada_1_step1);
    setText('itada-1-step2', data.itada_1_step2);
    setText('itada-1-step3', data.itada_1_step3);
    
    setText('itada-label-after', data.itada_label_after);
    setText('itada-2-title', data.itada_2_title);
    setText('itada-meaning-label-2', data.itada_meaning_label_2);
    setText('itada-2-mean', data.itada_2_mean);
    setText('itada-howto-label-2', data.itada_howto_label_2);
    setText('itada-2-step1', data.itada_2_step1);
    setText('itada-2-step2', data.itada_2_step2);
    setText('itada-2-step3', data.itada_2_step3);

    // ★お箸ページ
    setText('ohasi-page-title', data.ohasi_page_title); setText('ohasi-heading', data.ohasi_heading); setText('ohasi-desc', data.ohasi_desc);
    setText('ohasi-hold-title', data.ohasi_hold_title); setText('ohasi-step-1', data.ohasi_step_1); setText('ohasi-step-2', data.ohasi_step_2); setText('ohasi-step-3', data.ohasi_step_3);
    setText('ohasi-taboo-title', data.ohasi_taboo_title); setText('ohasi-taboo-desc', data.ohasi_taboo_desc);
    for(let i=1; i<=4; i++) { setText(`taboo-${i}-name`, data[`taboo_${i}_name`]); setText(`taboo-${i}-desc`, data[`taboo_${i}_desc`]); }
    
    // ★温泉
    setText('sentou-page-title', data.sentou_page_title); setText('sentou-heading', data.sentou_heading); setText('sentou-desc', data.sentou_desc);
    setText('sentou-flow-title', data.sentou_flow_title);
    for(let i=1; i<=4; i++) { setText(`flow-${i}-title`, data[`flow_${i}_title`]); setText(`flow-${i}-desc`, data[`flow_${i}_desc`]); }
    setText('sentou-rule-title', data.sentou_rule_title);
    for(let i=1; i<=3; i++) { setText(`rule-${i}-title`, data[`rule_${i}_title`]); setText(`rule-${i}-desc`, data[`rule_${i}_desc`]); }

    // ★靴
    setText('kutu-page-title', data.kutu_page_title); setText('kutu-heading', data.kutu_heading); setText('kutu-desc', data.kutu_desc);
    setText('kutu-list-title', data.kutu_list_title);
    for(let i=1; i<=6; i++) { setText(`place-${i}-title`, data[`place_${i}_title`]); setText(`place-${i}-desc`, data[`place_${i}_desc`]); }
    setText('tip-title', data.tip_title); setText('tip-desc', data.tip_desc); setText('tip-door', data.tip_door);

    // ★電車
    setText('densya-page-title', data.densya_page_title); setText('densya-heading', data.densya_heading); setText('densya-desc', data.densya_desc);
    setText('densya-rule-title', data.densya_rule_title);
    for(let i=1; i<=4; i++) { setText(`d-rule-${i}-title`, data[`d_rule_${i}_title`]); setText(`d-rule-${i}-desc`, data[`d_rule_${i}_desc`]); }
    setText('priority-title', data.priority_title); setText('priority-desc', data.priority_desc);

    // ★賽銭
    setText('saisen-page-title', data.saisen_page_title); setText('saisen-heading', data.saisen_heading); setText('saisen-desc', data.saisen_desc);
    setText('saisen-step-title', data.saisen_step_title);
    setText('prep-1-title', data.prep_1_title); setText('prep-1-desc', data.prep_1_desc);
    setText('prep-2-title', data.prep_2_title); setText('prep-2-desc', data.prep_2_desc);
    setText('ritual-title', data.ritual_title); setText('ritual-sub', data.ritual_sub);
    setText('badge-2-bows', data.badge_2_bows); setText('rit-1-title', data.rit_1_title); setText('rit-1-desc', data.rit_1_desc);
    setText('badge-2-claps', data.badge_2_claps); setText('rit-2-title', data.rit_2_title); setText('rit-2-desc', data.rit_2_desc);
    setText('badge-1-bow', data.badge_1_bow); setText('rit-3-title', data.rit_3_title); setText('rit-3-desc', data.rit_3_desc);
}