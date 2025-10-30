// Restaurant Menu Website - JavaScript
class RestaurantApp {
    constructor() {
        this.currentLanguage = 'tr';
        this.currentCategory = 'all';
        this.products = [];
        this.currentProduct = null;
        this.currentSelections = { extras: {}, removedIngredients: new Set() };
        this.cart = [];
        this.currentTheme = 'light';
        this.cartItems = [];
        
        this.init();
        this.registerServiceWorker();
    }

    init() {
        this.loadLanguage();
        this.loadTheme();
        this.setupEventListeners();
        this.setupInstallPrompt();
        this.loadProducts();
        this.showLanguageModal();
    }

    // Language System
    loadLanguage() {
        const savedLang = localStorage.getItem('restaurant_language');
        if (savedLang && this.isValidLanguage(savedLang)) {
            this.currentLanguage = savedLang;
        }
        this.updateLanguage();
    }

    isValidLanguage(lang) {
        const validLanguages = ['tr', 'en', 'ru', 'de', 'fr', 'ar'];
        return validLanguages.includes(lang);
    }

    updateLanguage() {
        document.documentElement.lang = this.currentLanguage;
        document.documentElement.setAttribute('data-lang', this.currentLanguage);
        
        // Update flag
        const flagMap = {
            'tr': '🇹🇷',
            'en': '🇺🇸',
            'ru': '🇷🇺',
            'de': '🇩🇪',
            'fr': '🇫🇷',
            'ar': '🇸🇦'
        };
        
        const currentFlag = document.getElementById('currentFlag');
        if (currentFlag) {
            currentFlag.textContent = flagMap[this.currentLanguage];
        }

        // Update RTL
        if (this.currentLanguage === 'ar') {
            document.documentElement.dir = 'rtl';
        } else {
            document.documentElement.dir = 'ltr';
        }

        // Update all translatable elements
        this.updateTranslations();
    }

    updateTranslations() {
        const translations = this.getTranslations();
        const elements = document.querySelectorAll('[data-translate]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[this.currentLanguage] && translations[this.currentLanguage][key]) {
                element.textContent = translations[this.currentLanguage][key];
            }
        });
    }

    getTranslations() {
        return {
            tr: {
                select_language: 'Dil Seçiniz',
                hero_title: 'Ne Yi\'cem diye düşünme!',
                hero_subtitle: 'Hemen indir',
                download: 'İndir',
                view_menu: 'Menüyü İncele',
                all_categories: 'Tümü',
                cat_pizzalar: 'Pizzalar',
                cat_ayvalik_tostu: 'Ayvalık Tostu',
                cat_soguk_sandvic: 'Soğuk Sandviç',
                cat_tavuk_doner: 'Tavuk Döner',
                cat_et_doner: 'Et Döner',
                cat_makarnalar: 'Makarnalar',
                cat_manti: 'Mantı',
                cat_hamburger: 'Hamburger',
                cat_kofte_spesiyel: 'Köfte Spesiyel',
                cat_aperatifler: 'Aperatifler',
                cat_bistro: 'Bistro',
                cat_salata: 'Salata',
                cat_icecekler: 'İçecekler',
                contact: 'İletişim',
                address: 'Fener Mah. 1968 Sk. No: 21/A Muratpaşa/ANTALYA',
                phone: '+90 242 323 1177',
                email: 'info@yicem.com',
                hours: 'Çalışma Saatleri',
                weekdays: 'Pazartesi - Cumartesi: 09:00 - 20:30',
                weekend: 'Pazar günü kapalı',
                follow_us: 'Bizi Takip Edin',
                all_rights: 'Tüm hakları saklıdır.',
                call_now: 'Ara',
                product_details: 'Sipariş Ver',
                order_now: 'Sipariş Ver',
                add_to_cart: 'Sepete Ekle',
                loading: 'Yükleniyor...',
                product_details: 'Ürün Detayları',
                extras: 'Ekstralar',
                ingredients: 'İçerikler',
                remove_ingredients: 'İçerik çıkar',
                total: 'Toplam',
                select_option: 'Bir seçenek seçiniz'
            },
            en: {
                select_language: 'Select Language',
                hero_title: 'Don\'t think about what to eat!',
                hero_subtitle: 'Download now',
                download: 'Download',
                view_menu: 'View Menu',
                all_categories: 'All',
                cat_pizzalar: 'Pizzas',
                cat_ayvalik_tostu: 'Ayvalık Toast',
                cat_soguk_sandvic: 'Cold Sandwich',
                cat_tavuk_doner: 'Chicken Döner',
                cat_et_doner: 'Beef Döner',
                cat_makarnalar: 'Pastas',
                cat_manti: 'Manti',
                cat_hamburger: 'Hamburger',
                cat_kofte_spesiyel: 'Meatball Special',
                cat_aperatifler: 'Appetizers',
                cat_bistro: 'Bistro',
                cat_salata: 'Salad',
                cat_icecekler: 'Drinks',
                contact: 'Contact',
                address: 'Fener Mah. 1968 Sk. No: 21/A Muratpaşa/ANTALYA',
                phone: '+90 242 323 1177',
                email: 'info@yicem.com',
                hours: 'Working Hours',
                weekdays: 'Monday - Saturday: 09:00 - 20:30',
                weekend: 'Closed on Sunday',
                follow_us: 'Follow Us',
                all_rights: 'All rights reserved.',
                call_now: 'Call',
                product_details: 'Order Now',
                order_now: 'Order Now',
                add_to_cart: 'Add to Cart',
                loading: 'Loading...',
                product_details: 'Product Details',
                extras: 'Extras',
                ingredients: 'Ingredients',
                remove_ingredients: 'Remove ingredients',
                total: 'Total',
                select_option: 'Please select an option'
            },
            ru: {
                select_language: 'Выберите язык',
                hero_title: 'Не думай, что поесть!',
                hero_subtitle: 'Скачай сейчас',
                download: 'Скачать',
                view_menu: 'Посмотреть меню',
                all_categories: 'Все',
                cat_pizzalar: 'Пиццы',
                cat_ayvalik_tostu: 'Тост Айвалык',
                cat_soguk_sandvic: 'Холодный сэндвич',
                cat_tavuk_doner: 'Куриный донер',
                cat_et_doner: 'Говяжий донер',
                cat_makarnalar: 'Паста',
                cat_manti: 'Манты',
                cat_hamburger: 'Гамбургер',
                cat_kofte_spesiyel: 'Кёфте Специаль',
                cat_aperatifler: 'Закуски',
                cat_bistro: 'Бистро',
                cat_salata: 'Салат',
                cat_icecekler: 'Напитки',
                contact: 'Контакты',
                address: 'Fener Mah. 1968 Sk. No: 21/A Muratpaşa/ANTALYA',
                phone: '+90 242 323 1177',
                email: 'info@yicem.com',
                hours: 'Часы работы',
                weekdays: 'Понедельник - Суббота: 09:00 - 20:30',
                weekend: 'Закрыто в воскресенье',
                follow_us: 'Подписывайтесь',
                all_rights: 'Все права защищены.',
                call_now: 'Позвонить',
                product_details: 'Заказать',
                order_now: 'Заказать',
                add_to_cart: 'В корзину',
                loading: 'Загрузка...',
                product_details: 'Детали продукта',
                extras: 'Дополнения',
                ingredients: 'Ингредиенты',
                remove_ingredients: 'Убрать ингредиенты',
                total: 'Итого',
                select_option: 'Выберите вариант'
            },
            de: {
                select_language: 'Sprache wählen',
                hero_title: 'Denk nicht darüber nach, was du essen sollst!',
                hero_subtitle: 'Jetzt herunterladen',
                download: 'Herunterladen',
                view_menu: 'Menü anzeigen',
                all_categories: 'Alle',
                cat_pizzalar: 'Pizzen',
                cat_ayvalik_tostu: 'Ayvalık-Toast',
                cat_soguk_sandvic: 'Kaltes Sandwich',
                cat_tavuk_doner: 'Hähnchen-Döner',
                cat_et_doner: 'Rind-Döner',
                cat_makarnalar: 'Pasta',
                cat_manti: 'Manti',
                cat_hamburger: 'Hamburger',
                cat_kofte_spesiyel: 'Köfte Spezial',
                cat_aperatifler: 'Vorspeisen',
                cat_bistro: 'Bistro',
                cat_salata: 'Salat',
                cat_icecekler: 'Getränke',
                contact: 'Kontakt',
                address: 'Fener Mah. 1968 Sk. No: 21/A Muratpaşa/ANTALYA',
                phone: '+90 242 323 1177',
                email: 'info@yicem.com',
                hours: 'Öffnungszeiten',
                weekdays: 'Montag - Samstag: 09:00 - 20:30',
                weekend: 'Sonntags geschlossen',
                follow_us: 'Folgen Sie uns',
                all_rights: 'Alle Rechte vorbehalten.',
                call_now: 'Anrufen',
                product_details: 'Jetzt bestellen',
                order_now: 'Jetzt bestellen',
                add_to_cart: 'In den Warenkorb',
                loading: 'Wird geladen...',
                product_details: 'Produktdetails',
                extras: 'Extras',
                ingredients: 'Zutaten',
                remove_ingredients: 'Zutaten entfernen',
                total: 'Gesamt',
                select_option: 'Bitte wählen Sie eine Option'
            },
            fr: {
                select_language: 'Choisir la langue',
                hero_title: 'Ne pense pas à ce que tu vas manger !',
                hero_subtitle: 'Télécharge maintenant',
                download: 'Télécharger',
                view_menu: 'Voir le menu',
                all_categories: 'Tout',
                cat_pizzalar: 'Pizzas',
                cat_ayvalik_tostu: 'Toast Ayvalık',
                cat_soguk_sandvic: 'Sandwich froid',
                cat_tavuk_doner: 'Döner au poulet',
                cat_et_doner: 'Döner au boeuf',
                cat_makarnalar: 'Pâtes',
                cat_manti: 'Manti',
                cat_hamburger: 'Hamburger',
                cat_kofte_spesiyel: 'Köfte Spécial',
                cat_aperatifler: 'Apéritifs',
                cat_bistro: 'Bistrot',
                cat_salata: 'Salade',
                cat_icecekler: 'Boissons',
                contact: 'Contact',
                address: 'Fener Mah. 1968 Sk. No: 21/A Muratpaşa/ANTALYA',
                phone: '+90 242 323 1177',
                email: 'info@yicem.com',
                hours: 'Heures d\'ouverture',
                weekdays: 'Lundi - Samedi: 09:00 - 20:30',
                weekend: 'Fermé le dimanche',
                follow_us: 'Suivez-nous',
                all_rights: 'Tous droits réservés.',
                call_now: 'Appeler',
                product_details: 'Commander',
                order_now: 'Commander',
                add_to_cart: 'Ajouter au panier',
                loading: 'Chargement...',
                product_details: 'Détails du produit',
                extras: 'Suppléments',
                ingredients: 'Ingrédients',
                remove_ingredients: 'Retirer des ingrédients',
                total: 'Total',
                select_option: 'Veuillez sélectionner une option'
            },
            ar: {
                select_language: 'اختر اللغة',
                hero_title: 'لا تفكر في ماذا تأكل!',
                hero_subtitle: 'حمل الآن',
                download: 'تحميل',
                view_menu: 'عرض القائمة',
                all_categories: 'الكل',
                cat_pizzalar: 'بيتزا',
                cat_ayvalik_tostu: 'توست أيفاليك',
                cat_soguk_sandvic: 'ساندويتش بارد',
                cat_tavuk_doner: 'شاورما دجاج',
                cat_et_doner: 'شاورما لحم',
                cat_makarnalar: 'باستا',
                cat_manti: 'مانتي',
                cat_hamburger: 'هامبورجر',
                cat_kofte_spesiyel: 'كفتة خاصة',
                cat_aperatifler: 'مقبلات',
                cat_bistro: 'بيسترو',
                cat_salata: 'سلطة',
                cat_icecekler: 'مشروبات',
                contact: 'اتصل بنا',
                address: 'Fener Mah. 1968 Sk. No: 21/A Muratpaşa/ANTALYA',
                phone: '+90 242 323 1177',
                email: 'info@yicem.com',
                hours: 'ساعات العمل',
                weekdays: 'الاثنين - السبت: 09:00 - 20:30',
                weekend: 'مغلق يوم الأحد',
                follow_us: 'تابعنا',
                all_rights: 'جميع الحقوق محفوظة.',
                call_now: 'اتصل',
                product_details: 'اطلب الآن',
                order_now: 'اطلب الآن',
                add_to_cart: 'أضف للسلة',
                loading: 'جاري التحميل...',
                product_details: 'تفاصيل المنتج',
                extras: 'إضافات',
                ingredients: 'المكونات',
                remove_ingredients: 'إزالة المكونات',
                total: 'الإجمالي',
                select_option: 'يرجى اختيار خيار'
            }
        };
    }

    // Helpers for localization from JSON with missing fields
    buildTranslations(nameObj = {}, descObj = {}) {
        const langs = ['tr','en','de','ru','fr','ar'];
        const result = {};
        langs.forEach(l => {
            const name = (nameObj && (nameObj[l] || nameObj.tr || nameObj.en)) || '';
            const description = (descObj && (descObj[l] || descObj.tr || descObj.en)) || '';
            result[l] = { name, description };
        });
        return result;
    }

    // Normalize any incoming label/value into a displayable string
    normalizeLabel(value) {
        if (value == null) return '';
        if (typeof value === 'string') return value;
        if (typeof value === 'number') return String(value);
        if (Array.isArray(value)) {
            return value.map(v => this.normalizeLabel(v)).filter(Boolean).join(' + ');
        }
        if (typeof value === 'object') {
            if (value.name && typeof value.name === 'string') return value.name;
            const lang = this.currentLanguage || 'tr';
            if (value[lang] && typeof value[lang] === 'string') return value[lang];
            if (value.tr && typeof value.tr === 'string') return value.tr;
            if (value.en && typeof value.en === 'string') return value.en;
        }
        try { return String(value); } catch (_) { return ''; }
    }

// --- BEGIN: Static image maps (top-level constants) ---
}

// Ürün ID -> kesin resim yolu (gerekli gördükçe doldurulabilir)
const PRODUCT_IMAGE_MAP = {
    // Örnek:
    // 'p_margherita': './pic/Pizzalar/margarita.jpg',
};

// Klasörlere göre mevcut görsel dosyaları (pic/ altı)
const AVAILABLE_IMAGES = {
    'Pizzalar': [
        '4-peynirli-yicem.jpg','brokoli-yicem.jpg','diavola-yicem.jpg','donerli-yicem.jpg','ıspanak-tulum-yicem.jpg','kavurmali-yicem.jpg','klasik-yicem.jpg','margarita.jpg','mix-yicem-pizza.jpg','sosisli-yicem.jpg','sucuklu-yicem.jpg','tavuklu-yicem.jpg','tonno-yicem.jpg'
    ],
    'Ayvalik-Tostu': [
        'sanayi-tostu.jpg','soguk-sandvic.jpg','yicem-donerli.jpg','yicem-evkofteli.jpg','yicem-karisik.jpg','yicem-kasarli-jambon.jpg','yicem-kasarli.jpg','yicem-kavurma.jpg','yicem-mega-karisik.jpg','yicem-salam.jpg','yicem-schnitzel.jpg','yicem-sucuklu.jpg','yicem-super-karisik.jpg','yicem-yengen.jpg','yicem-yengenn.jpg'
    ],
    'Tavuk-Doner': [
        '3lu-tavuk-doner.jpg','5lı-tavuk-doner.jpg','pilav-ustu-tavuk-doner.jpg','tavuk-doner-beyti.jpg','tavuk-doner-porsiyon.jpg','tavuk-doner.jpg','tavuk-iskender.jpg'
    ],
    'Et-Doner': [
        '3lu-etdoner.jpg','5li-etdoner.jpg','ayvalik-etdoner.jpg','et-doner-porsiyon.jpg','et-doner.jpg','et-iskender.jpg','kasarli-etdoner.jpg','pilavustu-etdoner.jpg','soslu-doner.jpg'
    ],
    'Makarnalar': [
        'alfredo.jpg','arabiata.jpg','bolonez.jpg','manti.jpg','Napoliten.jpg','pesto.jpg','ton-balikli.jpg','turkusulu.jpg'
    ],
    'Hamburger': [
        'cheeseburger.jpg','hamburger.jpg','tavukburger.jpg'
    ],
    'Kofte-Spesiyel': [
        'ekmekarasi.jpg','kasarli-kofte.jpg','sefin-izgarasi.jpg'
    ],
    'Aperatifler': [
        'citir.jpg','elmadilim.jpg','parmakpatates.jpg'
    ],
    'Bistro': [
        'barbekusoslutavuk.jpg','cafedeparis.jpg','chicken-quesadilla.jpg','chicken-stroganoff.jpg','dagkekigi-kremali.jpg','kasarli-mantarli-quesadilla.jpg','mantarli-kori-tavuk.jpg','mexicanososlutavuk.jpg','tatliacisoslutavuk.jpg','tavuk-wrap.jpg','viyana.jpg'
    ],
    'Salata': [
        'baharsalata.jpg','citir-tavuk-salata.jpg','diyet-tavuk-salata.jpg','hellim-salata.jpg','sezar.jpg','tonnosalata.jpg'
    ],
    'Icecek': [
        '4lucamicecek.jpg','ayran.jpg','cay.jpg','cocacola.jpg','fanta.jpg','icetea.jpg','litrelikicecek.jpg','pepsi.jpg','redbull.jpg','salgam.jpg','soda.jpg','sprite.jpg','su.jpg','turk-kahvesi.jpg'
    ]
};

// --- END: Static image maps ---

// Sınıfın devamı
class __KeepTypes__ {}

	// Build description for display: for pizzas always use language-specific description; others fallback to ingredients
	getDisplayDescription(product, translation) {
		try {
			// Force fixed multilingual description for doner categories
			if (product?.category === 'tavuk-doner' || product?.category === 'et-doner') {
				return translation?.description || '';
			}
			// Tüm ürünlerde: önce aktif dildeki ingredients
			const lang = this.currentLanguage || 'tr';
			if (product?.ingredients) {
				if (Array.isArray(product.ingredients)) {
					if (product.ingredients.length) return product.ingredients.join(', ');
				} else if (typeof product.ingredients === 'object') {
					const localized = product.ingredients[lang];
					if (Array.isArray(localized) && localized.length) return localized.join(', ');
					// Eğer o dilde yoksa ve çeviri açıklaması varsa, onu kullan (dil uyumu için)
					if (translation?.description) return translation.description;
					// Son çare TR ingredients
					const trList = product.ingredients.tr;
					if (Array.isArray(trList) && trList.length) return trList.join(', ');
				}
			}
			// Ingredients yoksa çeviri açıklamasına düş
			if (translation?.description) return translation.description;
		} catch (e) {}
		return translation?.description || '';
	}

    // Get local image based on product ID/name and available files
    getLocalImage(categoryFolder, productId, productName) {
        // 1) Explicit ID map
        if (typeof PRODUCT_IMAGE_MAP !== 'undefined' && PRODUCT_IMAGE_MAP[productId]) {
            return PRODUCT_IMAGE_MAP[productId];
        }

        const folder = this.resolvePicFolder(categoryFolder);
        const key = String(categoryFolder || '').toLowerCase();

        // 2) Special single-file cases
        if (key === 'soguk-sandvic') {
            return `./pic/Ayvalik-Tostu/soguk-sandvic.jpg`;
        }
        if (key === 'manti') {
            return `./pic/Makarnalar/manti.jpg`;
        }

        // 3) No name → category default
        if (!productName) {
            return this.getDefaultImage(folder, productId);
        }

        // 4) Try mapping by cleaned name
        const cleanName = this.cleanProductName(productName);
        const mapped = this.findMatchingImage(cleanName);
        if (mapped) {
            return `./pic/${folder}/${mapped}`;
        }

        // 5) Try best match from AVAILABLE_IMAGES list
        const best = this.bestMatchFile(cleanName, folder);
        if (best) {
            return `./pic/${folder}/${best}`;
        }

        // 6) Slug-based fallback
        const fallbackFile = `${cleanName}.jpg`;
        return `./pic/${folder}/${fallbackFile}`;
    }

    // Clean product name for better matching
    cleanProductName(name) {
        if (!name) return '';
        // First transliterate Turkish characters to ASCII
        const turkishMap = {
            'ı': 'i', 'İ': 'i', 'ğ': 'g', 'Ğ': 'g',
            'ü': 'u', 'Ü': 'u', 'ş': 's', 'Ş': 's',
            'ö': 'o', 'Ö': 'o', 'ç': 'c', 'Ç': 'c'
        };
        let result = String(name).toLowerCase();
        // Simple character replacement without regex
        for (let i = 0; i < result.length; i++) {
            if (turkishMap[result[i]]) {
                result = result.substring(0, i) + turkishMap[result[i]] + result.substring(i + 1);
            }
        }
        return result
            .replace(/[^a-z0-9\s]/g, '') // Remove special chars
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/--+/g, '-') // Replace multiple hyphens
            .trim();
    }

    // Resolve category folder name for /pic path
    resolvePicFolder(categoryFolder) {
        const key = String(categoryFolder || '')
            .toLowerCase()
            .replace(/\s+/g, '-')
            .trim();
        const mapping = {
            'pizzalar': 'Pizzalar',
            'ayvalik-tostu': 'Ayvalik-Tostu',
            // Soğuk Sandviç resmi Ayvalik-Tostu klasöründe tek dosya olarak tutulacak
            'soguk-sandvic': 'Ayvalik-Tostu',
            'tavuk-doner': 'Tavuk-Doner',
            'et-doner': 'Et-Doner',
            'makarnalar': 'Makarnalar',
            // Mantı resmi Makarnalar klasöründe tek dosya
            'manti': 'Makarnalar',
            'hamburger': 'Hamburger',
            'kofte-spesiyel': 'Kofte-Spesiyel',
            'aperatifler': 'Aperatifler',
            'bistro': 'Bistro',
            'salata': 'Salata',
            // İçecekler klasörü: Icecek
            'icecekler': 'Icecek',
            'icecek': 'Icecek'
        };
        // If already a proper folder-like string (e.g., 'Pizzalar'), keep it
        if (!mapping[key] && /^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(String(categoryFolder))) {
            return categoryFolder;
        }
        return mapping[key] || 'Pizzalar';
    }

    // Find matching image based on product name
    findMatchingImage(cleanName) {
        // Common image patterns to try
        const patterns = [
            cleanName,
            cleanName.replace(/-/g, ''),
            cleanName.replace(/-/g, '_'),
            cleanName.split('-')[0], // First word only
            cleanName.split('-').slice(0, 2).join('-'), // First two words
        ];

        // Known image mappings for common products
        const imageMappings = {
            'margarita': 'margarita.jpg',
            'sucuklu': 'sucuklu-pizza.jpg',
            'pepperoni': 'pepperoni-pizza.jpg',
            'ton-baligi': 'ton-balikli-sandvic.jpg',
            'tavuk-doner': 'tavuk-doner.jpg',
            'et-doner': 'et-doner.jpg',
            'hamburger': 'hamburger.jpg',
            'cheeseburger': 'cheeseburger.jpg',
            'sezar': 'sezar-salata.jpg',
            'cay': 'cay.jpg',
            'kahve': 'turk-kahvesi.jpg',
            'ayran': 'ayran.jpg',
            'cola': 'cocacola.jpg',
            'fanta': 'fanta.jpg',
            'sprite': 'sprite.jpg',
            'pepsi': 'pepsi.jpg',
            'soguk-sandvic': 'soguk-sandvic.jpg',
            'yicem-karisik': 'yicem-karisik.jpg',
            'yicem-sucuklu': 'yicem-sucuklu.jpg',
            'yicem-kasarli': 'yicem-kasarli.jpg',
            'yicem-salam': 'yicem-salam.jpg',
            'yicem-jambon': 'yicem-jambon.jpg',
            'yicem-kavurma': 'yicem-kavurma.jpg',
            'yicem-mega-karisik': 'yicem-mega-karisik.jpg',
            'yicem-super-karisik': 'yicem-super-karisik.jpg',
            'yicem-yengen': 'yicem-yengen.jpg',
            'yicem-donerli': 'yicem-donerli.jpg',
            'yicem-evkofteli': 'yicem-evkofteli.jpg',
            'yicem-schnitzel': 'yicem-schnitzel.jpg',
            'sanayi-tostu': 'sanayi-tostu.jpg',
            'bolonez': 'bolonez.jpg',
            'alfredo': 'alfredo.jpg',
                'arabiat': 'arabiat.jpg',
                'arabiata': 'arabiata.jpg',
                'napoliten': 'Napoliten.jpg',
            'pesto': 'pesto.jpg',
            'turkusulu': 'turkusulu.jpg',
            'manti': 'manti.jpg',
            'sefin-izgarasi': 'sefin-izgarasi.jpg',
            'ekmek-arasi': 'ekmekarasi.jpg',
                'kasarli-kofte': 'kasarli-kofte.jpg',
                'ekmek-arasi-kofte': 'kasarli-kofte.jpg',
                'ekmek-arasi-kasarli-kofte': 'kasarli-kofte.jpg',
                'kavurmali-yicem': 'kavurmali-yicem.jpg',
                'donerli-yicem': 'donerli-yicem.jpg',
                'klasik-vejeteryan': 'klasik-yicem.jpg',
                'brokoli-peynir-yicem': 'brokoli-yicem.jpg',
                'turk-usulu-4-peynirli': 'turkusulu.jpg',
                'sezar-salata': 'sezar.jpg',
                'pilavustu-tavuk-doner': 'pilav-ustu-tavuk-doner.jpg',
                '3-adet-tavuk-doner': '3lu-tavuk-doner.jpg',
                '5-adet-tavuk-doner': '5lı-tavuk-doner.jpg',
                'yicem-donerli': 'yicem-donerli.jpg',
                'tavuk-doner-beyti': 'tavuk-doner-beyti.jpg',
                'tavuk-doner-porsiyon': 'tavuk-doner-porsiyon.jpg',
                'tavuk-burger': 'tavukburger.jpg',
                'elma-dilim-patates': 'elmadilim.jpg',
                
                // Drinks image mappings
                'redbull': 'redbull.jpg',
                'coca-cola': 'cocacola.jpg',
                'pepsi': 'pepsi.jpg',
                'fanta': 'fanta.jpg',
                'sprite': 'sprite.jpg',
                'ice-tea': 'ice-tea.jpg',
                'litrelik-icecek': 'litrelikicecek.jpg',
                'yorukoglu-ayran': 'ayran.jpg',
                'su': 'su.jpg',
                'soda': 'soda.jpg',
                'salgam': 'salgam.jpg',
                'cay': 'cay.jpg',
                'turk-kahvesi': 'turk-kahvesi.jpg',
                '4lu-cam-icecek': '4lucamicecek.jpg',
            'citir': 'citir.jpg',
            'elmadilim': 'elmadilim.jpg',
            'parmak-patates': 'parmakpatates.jpg',
            'cafe-de-paris': 'cafedeparis.jpg',
            'barbeku-soslu-tavuk': 'barbekusoslutavuk.jpg',
            'chicken-quesadilla': 'chicken-quesadilla.jpg',
            'chicken-stroganoff': 'chicken-stroganoff.jpg',
            'dagkekigi-kremali': 'dagkekigi-kremali.jpg',
            'kasarli-mantarli-quesadilla': 'kasarli-mantarli-quesadilla.jpg',
            'mantarli-kori-tavuk': 'mantarli-kori-tavuk.jpg',
            'mexican-soslu-tavuk': 'mexicanososlutavuk.jpg',
            'tatliaci-soslu-tavuk': 'tatliacisoslutavuk.jpg',
            'tavuk-wrap': 'tavuk-wrap.jpg',
            'viyana': 'viyana.jpg',
            'bahar-salata': 'baharsalata.jpg',
            'citir-tavuk-salata': 'citir-tavuk-salata.jpg',
            'diyet-tavuk-salata': 'diyet-tavuk-salata.jpg',
            'hellim-salata': 'hellim-salata.jpg',
            'tonno-salata': 'tonnosalata.jpg',
            '3lu-tavuk-doner': '3lu-tavuk-doner.jpg',
            '5li-tavuk-doner': '5lı-tavuk-doner.jpg',
            'pilav-ustu-tavuk-doner': 'pilav-ustu-tavuk-doner.jpg',
            'tavuk-doner-beyti': 'tavuk-doner-beyti.jpg',
            'tavuk-doner-porsiyon': 'tavuk-doner-porsiyon.jpg',
            'tavuk-iskender': 'tavuk-iskender.jpg',
            '3lu-et-doner': '3lu-etdoner.jpg',
            '5li-et-doner': '5li-etdoner.jpg',
            'ayvalik-et-doner': 'ayvalik-etdoner.jpg',
            'et-doner-porsiyon': 'et-doner-porsiyon.jpg',
            'et-iskender': 'et-iskender.jpg',
            'kasarli-et-doner': 'kasarli-etdoner.jpg',
            'pilav-ustu-et-doner': 'pilavustu-etdoner.jpg',
            'soslu-doner': 'soslu-doner.jpg',
            '4-peynirli-yicem': '4-peynirli-yicem.jpg',
            'brokoli-yicem': 'brokoli-yicem.jpg',
            'diavola-yicem': 'diavola-yicem.jpg',
            'donerli-yicem': 'donerli-yicem.jpg',
            'ispanak-tulum-yicem': 'ıspanak-tulum-yicem.jpg',
            'kavurmali-yicem': 'kavurmali-yicem.jpg',
            'klasik-yicem': 'klasik-yicem.jpg',
            'mix-yicem-pizza': 'mix-yicem-pizza.jpg',
            'sosisli-yicem': 'sosisli-yicem.jpg',
            'sucuklu-yicem': 'sucuklu-yicem.jpg',
            'tavuklu-yicem': 'tavuklu-yicem.jpg',
            'tonno-yicem': 'tonno-yicem.jpg',
            '4lu-cam-icecek': '4lucamicecek.jpg',
            'ice-tea': 'icetea.jpg',
            'litrelik-icecek': 'litrelikicecek.jpg',
            'red-bull': 'redbull.jpg',
            'salgam': 'salgam.jpg',
            'soda': 'soda.jpg',
            'su': 'su.jpg',
            'turk-kahvesi': 'turk-kahvesi.jpg',
            'lavas-ekmegi': 'lavasekmegi.jpg',
            'tas-firin-ekmegi': 'tasfirinekmegi.jpg',
            // Additional mappings for missing products
            'mix-yicem': 'mix-yicem-pizza.jpg',
            'yicem-super-karisik': 'yicem-super-karisik.jpg',
            'yicem-kasarli-jambon': 'yicem-kasarli-jambon.jpg',
            'ton-balikli': 'ton-balikli.jpg',
            'kasarli-tavuk-durum': 'tavuk-doner.jpg',
            'tavuk-iskender': 'tavuk-iskender.jpg',
            'kaasrli-et-doner': 'kasarli-etdoner.jpg',
            'soslu-kaasrli-et-durum': 'kasarli-etdoner.jpg',
            // Additional mappings for proper image matching (without Turkish chars - they are automatically converted)
            'et-doner-70gr': 'et-doner.jpg',
            'et-doner-100gr': 'et-doner.jpg',
            'ispanak-tulum-yicem': 'ıspanak-tulum-yicem.jpg',
            'yicem-karisik': 'yicem-karisik.jpg',
            'yicem-mega-karisik': 'yicem-mega-karisik.jpg',
            'yicem-kavurma': 'yicem-kavurma.jpg',
            'yicem-sucuk': 'yicem-sucuklu.jpg',
            'yicem-ev-kofteli': 'yicem-evkofteli.jpg',
            'tatli-aci-soslu-tavuk': 'tatliacisoslutavuk.jpg',
            'mexicano-soslu-tavuk': 'mexicanososlutavuk.jpg',
            'barbeku-soslu-tavuk': 'barbekusoslutavuk.jpg',
            'cafe-de-paris-soslu-tavuk': 'cafedeparis.jpg',
            'mantarli-kori-soslu-tavuk': 'mantarli-kori-tavuk.jpg',
            'dag-kekigi-kremali-tavuk': 'dagkekigi-kremali.jpg',
            'viyana-pilic-sinitzel': 'viyana.jpg',
            'kasarli-mantarli-quesadilla': 'kasarli-mantarli-quesadilla.jpg',
            'tavuk-quesadilla': 'chicken-quesadilla.jpg',
            'chicken-stroganoff': 'chicken-stroganoff.jpg',
            '5-adet-tavuk-doner': '5li-tavuk-doner.jpg',
            '5li-tavuk-doner': '5li-tavuk-doner.jpg',
            '3-adet-et-doner-70gr': '3lu-etdoner.jpg',
            '3-adet-et-doner-100gr': '3lu-etdoner.jpg',
            '5-adet-et-doner-70gr': '5li-etdoner.jpg',
            '5-adet-et-doner-100gr': '5li-etdoner.jpg',
            'pilavustu-et-doner': 'pilavustu-etdoner.jpg',
            'soslu-et-doner': 'soslu-doner.jpg',
            'soslu-kasarli-et-durum-70gr': 'kasarli-etdoner.jpg',
            'soslu-kasarli-et-durum-100gr': 'kasarli-etdoner.jpg',
            'ayvalik-et-durum-70gr': 'ayvalik-etdoner.jpg',
            'ayvalik-kasarli-et-doner-70gr': 'ayvalik-etdoner.jpg',
            'ev-yapimi-manti': 'manti.jpg',
            'ton-balikli': 'ton-balikli.jpg',
            'napoliten': 'Napoliten.jpg',
            'sefin-izgara-koftesi': 'sefin-izgarasi.jpg',
            'ekmek-arasi-kofte': 'ekmekarasi.jpg',
            'ekmek-arasi-kasarli-kofte': 'kasarli-kofte.jpg',
            'citir-tavuk-tabagi': 'citir.jpg',
            'tonno-yicem': 'tonno-yicem.jpg',
            'ice-tea': 'icetea.jpg',
            'redbull': 'redbull.jpg',
            'yorukoglu-ayran': 'ayran.jpg',
            'cay': 'cay.jpg',
            'turk-kahvesi': 'turk-kahvesi.jpg',
            'turkusulu': 'turkusulu.jpg',
            'turk-usulu-4-peynirli': 'turkusulu.jpg'
        };

        // Try exact matches first
        for (const pattern of patterns) {
            if (imageMappings[pattern]) {
                return imageMappings[pattern];
            }
        }

        // Try partial matches
        for (const [key, value] of Object.entries(imageMappings)) {
            if (cleanName.includes(key) || key.includes(cleanName)) {
                return value;
            }
        }

        return null;
    }

    // Choose best matching file from AVAILABLE_IMAGES for a folder
    bestMatchFile(cleanName, folder) {
        const list = (typeof AVAILABLE_IMAGES !== 'undefined' && AVAILABLE_IMAGES[folder]) ? AVAILABLE_IMAGES[folder] : [];
        if (!cleanName || !list.length) return null;

        // Exact without extension
        const exact = list.find(f => f.replace(/\.jpg$/i, '') === cleanName);
        if (exact) return exact;

        // Starts with
        const starts = list.find(f => f.toLowerCase().startsWith(cleanName));
        if (starts) return starts;

        // Includes either way
        const includes = list.find(f => f.toLowerCase().includes(cleanName) || cleanName.includes(f.replace(/\.jpg$/i, '').toLowerCase()));
        if (includes) return includes;

        // Alternative candidates
        const altCandidates = [
            cleanName.replace(/-/g, ''),
            cleanName.replace(/-/g, '_'),
            cleanName.split('-')[0],
            cleanName.split('-').slice(0, 2).join('-')
        ].filter(Boolean);

        for (const c of altCandidates) {
            const hit = list.find(f => f.toLowerCase().includes(c));
            if (hit) return hit;
        }

        return null;
    }

    // Get default image for category
    getDefaultImage(categoryFolder, productId) {
        const key = String(categoryFolder || '')
            .toLowerCase()
            .replace(/\s+/g, '-')
            .trim();
        const defaultImages = {
            'pizzalar': 'margarita.jpg',
            'ayvalik-tostu': 'yicem-karisik.jpg',
            'soguk-sandvic': 'soguk-sandvic.jpg',
            'tavuk-doner': 'tavuk-doner.jpg',
            'et-doner': 'et-doner.jpg',
            'makarnalar': 'bolonez.jpg',
            'manti': 'manti.jpg',
            'hamburger': 'hamburger.jpg',
            'kofte-spesiyel': 'sefin-izgarasi.jpg',
            'aperatifler': 'citir.jpg',
            'bistro': 'cafedeparis.jpg',
            'salata': 'sezar.jpg',
            'icecekler': 'cay.jpg'
        };

        const folder = this.resolvePicFolder(categoryFolder);
        const defaultImg = defaultImages[key];
        return defaultImg ? `./pic/${folder}/${defaultImg}` : `https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=300&fit=crop&sig=${productId}`;
    }

    showLanguageModal() {
        const modal = document.getElementById('languageModal');
        if (modal && !localStorage.getItem('language_selected')) {
            modal.classList.add('show');
        }
    }

    hideLanguageModal() {
        const modal = document.getElementById('languageModal');
        if (modal) {
            modal.classList.remove('show');
            localStorage.setItem('language_selected', 'true');
        }
    }

    // Product Data
	loadProducts() {
		try {
			// Öncelikle çevirili birleşik menü JSON'unu yüklemeyi dene
			fetch('./yicem_menu_translated.json')
				.then(res => {
					if (!res.ok) throw new Error('Menu JSON not found');
					return res.json();
				})
				.then(data => {
					this.products = this.mapTranslatedMenuToProducts(data);
					// Pizzalar ve Ayvalık Tostu için ingredients'i çevirilerden dil bazlı tamamla
					this.normalizeIngredientsForCategories(['pizzalar','ayvalik-tostu']);
					// Döner kategorileri için açıklama, menü seçenekleri ve içerik normalizasyonu
					this.normalizeDonerCategories(['tavuk-doner','et-doner']);
					console.log(`Total products loaded (translated menu): ${this.products.length}`);
					this.renderProducts();
				})
				.catch(() => {
					// Yükleme başarısız: boş liste göster
					this.products = [];
					this.renderProducts();
				});
		} catch (error) {
			console.error('Error loading products:', error);
			// Hata durumunda boş array
			this.products = [];
			this.renderProducts();
		}
	}

	// yicem_menu_translated.json -> dahili ürün yapısına dönüştür
	mapTranslatedMenuToProducts(data) {
		if (!data || !data.restaurant || !Array.isArray(data.restaurant.categories)) return [];
		const catMap = {
			pizza: 'pizzalar',
			toast: 'ayvalik-tostu',
			sandwich: 'soguk-sandvic',
			'chicken-doner': 'tavuk-doner',
			'beef-doner': 'et-doner',
			pasta: 'makarnalar',
			manti: 'manti',
			hamburger: 'hamburger',
			kofte: 'kofte-spesiyel',
			aperatifler: 'aperatifler',
			bistro: 'bistro',
			salad: 'salata',
			drinks: 'icecekler',
			// Legacy mappings for backward compatibility
			ayvalik_tostu: 'ayvalik-tostu',
			soguk_sandvic: 'soguk-sandvic',
			tavuk_doner: 'tavuk-doner',
			et_doner: 'et-doner',
			makarna: 'makarnalar',
			kofte_spesiyel: 'kofte-spesiyel',
			salata: 'salata',
			icecekler: 'icecekler'
		};

		const products = [];
		for (const category of data.restaurant.categories) {
			const internalCat = catMap[category.id] || category.id;
			if (!Array.isArray(category.products)) continue;
			for (const product of category.products) {
				const nameTr = product?.name?.tr || product?.name?.en || '';
                const imagePath = (typeof PRODUCT_IMAGE_MAP !== 'undefined' && PRODUCT_IMAGE_MAP[product.id])
                    ? PRODUCT_IMAGE_MAP[product.id]
                    : this.getLocalImage(internalCat, product.id, nameTr);
                const mapped = {
					id: product.id,
					category: internalCat,
					price: product.price,
                    image: imagePath,
					translations: this.buildTranslations(product.name, product.description),
					// contents çok dilli obje; mevcut dili seç ya da tüm objeyi koru
					ingredients: (product.contents && (product.contents[this.currentLanguage] || product.contents.tr)) ? product.contents : (product.contents || {}),
					extras: []
				};
                // Bellekte kesin eşleştirme tablosunu doldur (ileride kalıcıya çekilebilir)
                if (typeof PRODUCT_IMAGE_MAP !== 'undefined' && !PRODUCT_IMAGE_MAP[product.id]) {
                    PRODUCT_IMAGE_MAP[product.id] = imagePath;
                }

				// Boyut/seçenekler -> radio extra
				if (Array.isArray(product.options) && product.options.length) {
					mapped.extras.push({
						type: 'radio',
						name: 'Boyut',
						translations: { tr: 'Boyut', en: 'Size', de: 'Größe', ru: 'Размер', fr: 'Taille', ar: 'الحجم' },
						options: product.options.map(option => ({
							id: option.id,
							name: option.label?.[this.currentLanguage] || option.label?.tr || option.label?.en || '',
							translations: this.buildTranslations(option.label || {}, {}),
							priceDelta: option.price || 0
						}))
					});
				}

				// Ekstralar: ana ve yan ürünler -> checkbox grupları
				if (product.extras && Array.isArray(product.extras.mainProducts) && product.extras.mainProducts.length) {
					mapped.extras.push({
						type: 'checkbox',
						name: 'Ana Ürünler (2 seçim)',
						translations: { tr: 'Ana Ürünler (2 seçim)', en: 'Main Products (choose 2)', de: 'Hauptprodukte (2 auswählen)', ru: 'Основные продукты (выбрать 2)', fr: 'Produits principaux (choisir 2)', ar: 'المنتجات الرئيسية (اختياران)' },
						options: product.extras.mainProducts.map(item => ({
							id: item.id,
							name: item.name?.[this.currentLanguage] || item.name?.tr || item.name?.en || '',
							translations: this.buildTranslations(item.name || {}, {}),
							priceDelta: item.price || 0
						}))
					});
				}
				if (product.extras && Array.isArray(product.extras.sideProducts) && product.extras.sideProducts.length) {
					mapped.extras.push({
						type: 'checkbox',
						name: 'Yan Ürünler (4 seçim)',
						translations: { tr: 'Yan Ürünler (4 seçim)', en: 'Side Products (choose 4)', de: 'Beilagen (4 auswählen)', ru: 'Гарниры (выбрать 4)', fr: 'Accompagnements (choisir 4)', ar: 'المنتجات الجانبية (4 اختيارات)' },
						options: product.extras.sideProducts.map(item => ({
							id: item.id,
							name: item.name?.[this.currentLanguage] || item.name?.tr || item.name?.en || '',
							translations: this.buildTranslations(item.name || {}, {}),
							priceDelta: item.price || 0
						}))
					});
				}

				// Menü seçenekleri -> checkbox (Cips + Ayran, Cips + Kola vb.)
				if (product.extras && Array.isArray(product.extras.menuOptions) && product.extras.menuOptions.length) {
					mapped.extras.push({
						type: 'checkbox',
						name: 'Menü Seçenekleri',
						translations: { tr: 'Menü Seçenekleri', en: 'Menu Options', de: 'Menü-Optionen', ru: 'Варианты меню', fr: 'Options de Menu', ar: 'خيارات القائمة' },
						options: product.extras.menuOptions.map(item => ({
							id: item.id,
							name: item.name?.[this.currentLanguage] || item.name?.tr || item.name?.en || '',
							translations: this.buildTranslations(item.name || {}, {}),
							priceDelta: item.price || 0
						}))
					});
				}

				// Patates seçenekleri -> checkbox
				if (product.extras && Array.isArray(product.extras.potatoOptions) && product.extras.potatoOptions.length) {
					mapped.extras.push({
						type: 'checkbox',
						name: 'Patates Seçenekleri',
						translations: { tr: 'Patates Seçenekleri', en: 'Potato Options', de: 'Kartoffel-Optionen', ru: 'Варианты картофеля', fr: 'Options de Pommes', ar: 'خيارات البطاطس' },
						options: product.extras.potatoOptions.map(item => ({
							id: item.id,
							name: item.name?.[this.currentLanguage] || item.name?.tr || item.name?.en || '',
							translations: this.buildTranslations(item.name || {}, {}),
							priceDelta: item.price || 0
						}))
					});
				}

				// İçecek seçenekleri -> checkbox
				if (product.extras && Array.isArray(product.extras.drinkOptions) && product.extras.drinkOptions.length) {
					mapped.extras.push({
						type: 'checkbox',
						name: 'İçecek Seçenekleri',
						translations: { tr: 'İçecek Seçenekleri', en: 'Drink Options', de: 'Getränkeoptionen', ru: 'Варианты напитков', fr: 'Options de Boisson', ar: 'خيارات المشروبات' },
						options: product.extras.drinkOptions.map(item => ({
							id: item.id,
							name: item.name?.[this.currentLanguage] || item.name?.tr || item.name?.en || '',
							translations: this.buildTranslations(item.name || {}, {}),
							priceDelta: item.price || 0
						}))
					});
				}

				products.push(mapped);
			}
		}
		return products;
}

    // Ensure ingredients are language-specific by deriving from translations when missing
    normalizeIngredientsForCategories(categories = []) {
        const langs = ['tr','en','de','ru','fr','ar'];
        const splitDesc = (desc) => {
            return String(desc || '')
                .split(',')
                .map(s => s.trim())
                .filter(Boolean);
        };
        this.products = (this.products || []).map(p => {
            if (!categories.includes(p.category)) return p;
            const t = p.translations || {};
            let ing = p.ingredients;
            // Start from object form
            if (Array.isArray(ing)) {
                ing = { tr: ing };
            } else if (!ing || typeof ing !== 'object') {
                ing = {};
            }
            // Fill per language from existing translations when missing
            langs.forEach(l => {
                if (!Array.isArray(ing[l]) || ing[l].length === 0) {
                    const desc = t[l]?.description || '';
                    const arr = splitDesc(desc);
                    if (arr.length) {
                        ing[l] = arr;
                    }
                }
            });
            return { ...p, ingredients: ing };
        });
    }

    // Normalize descriptions, extras, and ingredients for doner categories
    normalizeDonerCategories(categories = []) {
        const langs = ['tr','en','de','ru','fr','ar'];
        const descByLang = {
            tr: 'Dürüm (Lavaş), Gobit Ekmek (Pita Ekmek), Taş Fırın Ekmeği veya Ayvalık Tostu Ekmeği Seçenekleri ile',
            en: 'With options: Wrap (Lavash), Gobit Bread (Pita), Stone Oven Bread or Ayvalık Toast Bread',
            de: 'Mit Optionen: Wrap (Lavash), Gobit Brot (Pita), Steinofenbrot oder Ayvalık-Toastbrot',
            ru: 'С вариантами: Лаваш (лаваш), хлеб гобит (пита), хлеб из каменной печи или хлеб для тоста Айвалык',
            fr: 'Avec options: Wrap (Lavash), Pain Gobit (Pita), Pain au four à pierre ou Pain toast Ayvalık',
            ar: 'مع خيارات: لفافة (لافاش)، خبز غوبِت (بيتا)، خبز فرن حجري أو خبز توست أيفاليك'
        };
        const potatoExtra = {
            type: 'checkbox',
            name: 'Ekstra Patates',
            translations: { tr: 'Ekstra Patates', en: 'Extra Fries', de: 'Extra Pommes', ru: 'Доп. картофель фри', fr: 'Frites supplémentaires', ar: 'بطاطس إضافية' },
            options: [ { id: 'patates', name: 'Patates', translations: { tr: 'Patates', en: 'Fries', de: 'Pommes', ru: 'Картофель фри', fr: 'Frites', ar: 'بطاطس' }, priceDelta: 10 } ]
        };
        this.products = (this.products || []).map(p => {
            if (!categories.includes(p.category)) return p;
            // Set multilingual descriptions
            const t = p.translations || {};
            const newTranslations = { ...t };
            langs.forEach(l => {
                const name = (t[l]?.name) || (t.tr?.name) || '';
                newTranslations[l] = { name, description: descByLang[l] };
            });
            // Remove onions (Soğan) from ingredients
            const sanitizeIngs = (ings) => {
                if (Array.isArray(ings)) return ings.filter(x => (x || '').toLowerCase() !== 'soğan');
                if (ings && typeof ings === 'object') {
                    const m = { ...ings };
                    Object.keys(m).forEach(k => {
                        if (Array.isArray(m[k])) m[k] = m[k].filter(x => (x || '').toLowerCase() !== 'soğan');
                    });
                    return m;
                }
                return ings;
            };
            let newIngredients = sanitizeIngs(p.ingredients);
            // Extras are already mapped from JSON, so don't override them
            // Just ensure beef doner has potato checkbox if missing
            let extras = Array.isArray(p.extras) ? [...p.extras] : [];
            if (p.category === 'et-doner') {
                const hasPotato = extras.some(e => e && e.type === 'checkbox' && (e.name && (e.name.includes('Patates') || e.name.includes('Potatoes') || e.name.includes('Potato'))));
                if (!hasPotato) extras.push(potatoExtra);
            }
            return { ...p, translations: newTranslations, ingredients: newIngredients, extras };
        });
    }

    mapPizzaJsonToProducts(pizzaProducts) {
        if (!Array.isArray(pizzaProducts)) return [];
        return pizzaProducts.map(product => ({
            id: product.id,
            category: 'pizzalar',
            price: product.price,
            image: this.getLocalImage('Pizzalar', product.id, product.name?.tr || product.name?.en || ''),
            translations: this.buildTranslations(product.name, product.description),
            ingredients: (product.contents && product.contents[this.currentLanguage]) || (product.contents && product.contents.tr) || [],
            extras: [{
                type: 'radio',
                name: 'Boyut',
                translations: { tr: 'Boyut', en: 'Size', de: 'Größe', ru: 'Размер', fr: 'Taille', ar: 'الحجم' },
                options: (product.options || []).map(option => ({
                    id: option.id,
                    name: option.label[this.currentLanguage] || option.label.tr,
                    translations: { tr: option.label.tr, en: option.label.en, de: option.label.de, ru: option.label.ru, fr: option.label.fr, ar: option.label.ar },
                    priceDelta: option.price
                }))
            }]
        }));
    }

    mapMantiJsonToProducts(mantiProducts) {
        if (!Array.isArray(mantiProducts)) return [];
        return mantiProducts.map(product => ({
            id: product.id,
            category: 'manti',
            price: product.price,
            image: this.getLocalImage('manti', product.id, product.name?.tr || product.name?.en || ''),
            translations: this.buildTranslations(product.name, product.description),
            ingredients: (product.contents && product.contents[this.currentLanguage]) || (product.contents && product.contents.tr) || [],
            extras: [
                {
                    type: 'radio',
                    name: 'Yoğurt Seçeneği',
                    translations: { tr: 'Yoğurt Seçeneği', en: 'Yogurt Option', de: 'Joghurt-Option', ru: 'Вариант йогурта', fr: 'Option Yaourt', ar: 'خيار الزبادي' },
                    options: (product.options || []).map(option => ({
                        id: option.id,
                        name: option.label[this.currentLanguage] || option.label.tr,
                        translations: { tr: option.label.tr, en: option.label.en, de: option.label.de, ru: option.label.ru, fr: option.label.fr, ar: option.label.ar },
                        priceDelta: option.price
                    }))
                },
                ...(product.extras && Array.isArray(product.extras.drinkOptions) ? [{
                    type: 'checkbox',
                    name: 'İçecek Seçenekleri',
                    translations: { tr: 'İçecek Seçenekleri', en: 'Drink Options', de: 'Getränkeoptionen', ru: 'Варианты напитков', fr: 'Options de Boisson', ar: 'خيارات المشروبات' },
                    options: product.extras.drinkOptions.map(drink => ({
                        id: drink.id,
                        name: drink.name[this.currentLanguage] || drink.name.tr,
                        translations: { tr: drink.name.tr, en: drink.name.en, de: drink.name.de, ru: drink.name.ru, fr: drink.name.fr, ar: drink.name.ar },
                        priceDelta: drink.price
                    }))
                }] : [])
            ]
        }));
    }

    mapKofteJsonToProducts(kofteProducts) {
        if (!Array.isArray(kofteProducts)) return [];
        return kofteProducts.map(product => ({
            id: product.id,
            category: 'kofte-spesiyel',
            price: product.price,
            image: this.getLocalImage('kofte-spesiyel', product.id, product.name?.tr || product.name?.en || ''),
            translations: this.buildTranslations(product.name, product.description),
            ingredients: (product.contents && product.contents[this.currentLanguage]) || (product.contents && product.contents.tr) || [],
            extras: [{
                type: 'radio',
                name: 'Servis',
                translations: { tr: 'Servis', en: 'Serving', de: 'Servieren', ru: 'Подача', fr: 'Service', ar: 'تقديم' },
                options: (product.options || []).map(option => ({
                    id: option.id,
                    name: option.label[this.currentLanguage] || option.label.tr,
                    translations: { tr: option.label.tr, en: option.label.en, de: option.label.de, ru: option.label.ru, fr: option.label.fr, ar: option.label.ar },
                    priceDelta: option.price
                }))
            }]
        }));
    }

    mapPastaJsonToProducts(pastaProducts) {
        if (!Array.isArray(pastaProducts)) return [];
        return pastaProducts.map(product => ({
            id: product.id,
            category: 'makarnalar',
            price: product.price,
            image: this.getLocalImage('makarnalar', product.id, product.name?.tr || product.name?.en || ''),
            translations: this.buildTranslations(product.name, product.description),
            ingredients: (product.contents && product.contents[this.currentLanguage]) || (product.contents && product.contents.tr) || [],
            extras: [
                {
                    type: 'radio',
                    name: 'Makarna Türü',
                    translations: { tr: 'Makarna Türü', en: 'Pasta Type', de: 'Pastasorte', ru: 'Вид пасты', fr: 'Type de Pâtes', ar: 'نوع المعكرونة' },
                    options: (product.options || []).map(option => ({
                        id: option.id,
                        name: option.label[this.currentLanguage] || option.label.tr,
                        translations: { tr: option.label.tr, en: option.label.en, de: option.label.de, ru: option.label.ru, fr: option.label.fr, ar: option.label.ar },
                        priceDelta: option.price
                    }))
                },
                ...(product.extras && Array.isArray(product.extras.drinkOptions) ? [{
                    type: 'checkbox',
                    name: 'İçecek Seçenekleri',
                    translations: { tr: 'İçecek Seçenekleri', en: 'Drink Options', de: 'Getränkeoptionen', ru: 'Варианты напитков', fr: 'Options de Boisson', ar: 'خيارات المشروبات' },
                    options: product.extras.drinkOptions.map(drink => ({
                        id: drink.id,
                        name: drink.name[this.currentLanguage] || drink.name.tr,
                        translations: { tr: drink.name.tr, en: drink.name.en, de: drink.name.de, ru: drink.name.ru, fr: drink.name.fr, ar: drink.name.ar },
                        priceDelta: drink.price
                    }))
                }] : [])
            ]
        }));
    }

    mapBeefDonerJsonToProducts(donerProducts) {
        if (!Array.isArray(donerProducts)) return [];
        return donerProducts.map(product => ({
            id: product.id,
            category: 'et-doner',
            price: product.price,
            image: this.getLocalImage('et-doner', product.id, product.name?.tr || product.name?.en || ''),
            translations: this.buildTranslations(product.name, product.description),
            ingredients: (product.contents && product.contents[this.currentLanguage]) || (product.contents && product.contents.tr) || [],
            extras: [
                ...(Array.isArray(product.options) && product.options.length ? [{
                    type: 'radio',
                    name: 'Servis',
                    translations: { tr: 'Servis', en: 'Serving', de: 'Servieren', ru: 'Подача', fr: 'Service', ar: 'تقديم' },
                    options: product.options.map(option => ({
                        id: option.id,
                        name: option.label?.[this.currentLanguage] || option.label?.tr || option.label?.en || '',
                        translations: {
                            tr: option.label?.tr || '',
                            en: option.label?.en || '',
                            de: option.label?.de || option.label?.en || '',
                            ru: option.label?.ru || option.label?.en || '',
                            fr: option.label?.fr || option.label?.en || '',
                            ar: option.label?.ar || option.label?.en || ''
                        },
                        priceDelta: option.price || 0
                    }))
                }] : [])
            ]
        }));
    }

    mapBistroJsonToProducts(bistroProducts) {
        if (!Array.isArray(bistroProducts)) return [];
        return bistroProducts.map(product => ({
            id: product.id,
            category: 'bistro',
            price: product.price,
            image: this.getLocalImage('bistro', product.id, product.name?.tr || product.name?.en || ''),
            translations: this.buildTranslations(product.name, product.description),
            ingredients: (product.contents && product.contents[this.currentLanguage]) || (product.contents && product.contents.tr) || [],
            extras: [
                ...(Array.isArray(product.options) && product.options.length ? [{
                    type: 'radio',
                    name: 'Servis',
                    translations: { tr: 'Servis', en: 'Serving', de: 'Servieren', ru: 'Подача', fr: 'Service', ar: 'تقديم' },
                    options: product.options.map(option => ({
                        id: option.id,
                        name: option.label?.[this.currentLanguage] || option.label?.tr || option.label?.en || '',
                        translations: {
                            tr: option.label?.tr || '',
                            en: option.label?.en || '',
                            de: option.label?.de || option.label?.en || '',
                            ru: option.label?.ru || option.label?.en || '',
                            fr: option.label?.fr || option.label?.en || '',
                            ar: option.label?.ar || option.label?.en || ''
                        },
                        priceDelta: option.price || 0
                    }))
                }] : [])
            ]
        }));
    }

    mapToastJsonToProducts(toastProducts) {
        if (!Array.isArray(toastProducts)) return [];
        return toastProducts.map(product => ({
            id: product.id,
            category: 'ayvalik-tostu',
            price: product.price,
            image: this.getLocalImage('ayvalik-tostu', product.id, product.name?.tr || product.name?.en || ''),
            translations: this.buildTranslations(product.name, product.description),
            ingredients: (product.contents && product.contents[this.currentLanguage]) || (product.contents && product.contents.tr) || [],
            extras: [
                ...(Array.isArray(product.options) && product.options.length ? [{
                    type: 'radio',
                    name: 'Servis',
                    translations: { tr: 'Servis', en: 'Serving', de: 'Servieren', ru: 'Подача', fr: 'Service', ar: 'تقديم' },
                    options: product.options.map(option => ({
                        id: option.id,
                        name: option.label?.[this.currentLanguage] || option.label?.tr || option.label?.en || '',
                        translations: {
                            tr: option.label?.tr || '',
                            en: option.label?.en || '',
                            de: option.label?.de || option.label?.en || '',
                            ru: option.label?.ru || option.label?.en || '',
                            fr: option.label?.fr || option.label?.en || '',
                            ar: option.label?.ar || option.label?.en || ''
                        },
                        priceDelta: option.price || 0
                    }))
                }] : [])
            ]
        }));
    }

    mapSandwichJsonToProducts(sandwichProducts) {
        if (!Array.isArray(sandwichProducts)) return [];
        return sandwichProducts.map(product => ({
            id: product.id,
            category: 'soguk-sandvic',
            price: product.price,
            image: this.getLocalImage('soguk-sandvic', product.id, product.name?.tr || product.name?.en || ''),
            translations: this.buildTranslations(product.name, product.description),
            ingredients: (product.contents && product.contents[this.currentLanguage]) || (product.contents && product.contents.tr) || [],
            extras: [
                // Servis seçenekleri
                ...(Array.isArray(product.options) && product.options.length ? [{
                    type: 'radio',
                    name: 'Servis',
                    translations: { tr: 'Servis', en: 'Serving', de: 'Servieren', ru: 'Подача', fr: 'Service', ar: 'تقديم' },
                    options: product.options.map(option => ({
                        id: option.id,
                        name: option.label?.[this.currentLanguage] || option.label?.tr || option.label?.en || '',
                        translations: {
                            tr: option.label?.tr || '',
                            en: option.label?.en || '',
                            de: option.label?.de || option.label?.en || '',
                            ru: option.label?.ru || option.label?.en || '',
                            fr: option.label?.fr || option.label?.en || '',
                            ar: option.label?.ar || option.label?.en || ''
                        },
                        priceDelta: option.price || 0
                    }))
                }] : []),
                // Ana ürünler (2 seçim)
                ...(product.extras && product.extras.mainProducts ? [{
                    type: 'checkbox',
                    name: 'Ana Ürünler (2 seçim)',
                    translations: { 
                        tr: 'Ana Ürünler (2 seçim)', 
                        en: 'Main Products (2 choices)', 
                        de: 'Hauptprodukte (2 Auswahl)', 
                        ru: 'Основные продукты (2 выбора)', 
                        fr: 'Produits Principaux (2 choix)', 
                        ar: 'المنتجات الرئيسية (اختياران)' 
                    },
                    options: product.extras.mainProducts.map(item => ({
                        id: item.id,
                        name: item.name?.[this.currentLanguage] || item.name?.tr || item.name?.en || '',
                        translations: {
                            tr: item.name?.tr || '',
                            en: item.name?.en || '',
                            de: item.name?.de || item.name?.en || '',
                            ru: item.name?.ru || item.name?.en || '',
                            fr: item.name?.fr || item.name?.en || '',
                            ar: item.name?.ar || item.name?.en || ''
                        },
                        priceDelta: item.price || 0
                    }))
                }] : []),
                // Yan ürünler (4 seçim)
                ...(product.extras && product.extras.sideProducts ? [{
                    type: 'checkbox',
                    name: 'Yan Ürünler (4 seçim)',
                    translations: { 
                        tr: 'Yan Ürünler (4 seçim)', 
                        en: 'Side Products (4 choices)', 
                        de: 'Beilagen (4 Auswahl)', 
                        ru: 'Гарниры (4 выбора)', 
                        fr: 'Accompagnements (4 choix)', 
                        ar: 'المنتجات الجانبية (4 اختيارات)' 
                    },
                    options: product.extras.sideProducts.map(item => ({
                        id: item.id,
                        name: item.name?.[this.currentLanguage] || item.name?.tr || item.name?.en || '',
                        translations: {
                            tr: item.name?.tr || '',
                            en: item.name?.en || '',
                            de: item.name?.de || item.name?.en || '',
                            ru: item.name?.ru || item.name?.en || '',
                            fr: item.name?.fr || item.name?.en || '',
                            ar: item.name?.ar || item.name?.en || ''
                        },
                        priceDelta: item.price || 0
                    }))
                }] : [])
            ]
        }));
    }

    mapChickenDonerJsonToProducts(chickenDonerProducts) {
        if (!Array.isArray(chickenDonerProducts)) return [];
        return chickenDonerProducts.map(product => ({
            id: product.id,
            category: 'tavuk-doner',
            price: product.price,
            image: this.getLocalImage('tavuk-doner', product.id, product.name?.tr || product.name?.en || ''),
            translations: this.buildTranslations(product.name, product.description),
            ingredients: (product.contents && product.contents[this.currentLanguage]) || (product.contents && product.contents.tr) || [],
            extras: [
                ...(Array.isArray(product.options) && product.options.length ? [{
                    type: 'radio',
                    name: 'Servis',
                    translations: { tr: 'Servis', en: 'Serving', de: 'Servieren', ru: 'Подача', fr: 'Service', ar: 'تقديم' },
                    options: product.options.map(option => ({
                        id: option.id,
                        name: option.label?.[this.currentLanguage] || option.label?.tr || option.label?.en || '',
                        translations: {
                            tr: option.label?.tr || '',
                            en: option.label?.en || '',
                            de: option.label?.de || option.label?.en || '',
                            ru: option.label?.ru || option.label?.en || '',
                            fr: option.label?.fr || option.label?.en || '',
                            ar: option.label?.ar || option.label?.en || ''
                        },
                        priceDelta: option.price || 0
                    }))
                }] : [])
            ]
        }));
    }

    mapHamburgerJsonToProducts(hamburgerProducts) {
        if (!Array.isArray(hamburgerProducts)) return [];
        return hamburgerProducts.map(product => ({
            id: product.id,
            category: 'hamburger',
            price: product.price,
            image: this.getLocalImage('hamburger', product.id, product.name?.tr || product.name?.en || ''),
            translations: this.buildTranslations(product.name, product.description),
            ingredients: (product.contents && product.contents[this.currentLanguage]) || (product.contents && product.contents.tr) || [],
            extras: [
                ...(Array.isArray(product.options) && product.options.length ? [{
                    type: 'radio',
                    name: 'Servis',
                    translations: { tr: 'Servis', en: 'Serving', de: 'Servieren', ru: 'Подача', fr: 'Service', ar: 'تقديم' },
                    options: product.options.map(option => ({
                        id: option.id,
                        name: option.label?.[this.currentLanguage] || option.label?.tr || option.label?.en || '',
                        translations: {
                            tr: option.label?.tr || '',
                            en: option.label?.en || '',
                            de: option.label?.de || option.label?.en || '',
                            ru: option.label?.ru || option.label?.en || '',
                            fr: option.label?.fr || option.label?.en || '',
                            ar: option.label?.ar || option.label?.en || ''
                        },
                        priceDelta: option.price || 0
                    }))
                }] : [])
            ]
        }));
    }

    mapAperatiflerJsonToProducts(aperatiflerProducts) {
        if (!Array.isArray(aperatiflerProducts)) return [];
        return aperatiflerProducts.map(product => ({
            id: product.id,
            category: 'aperatifler',
            price: product.price,
            image: this.getLocalImage('aperatifler', product.id, product.name?.tr || product.name?.en || ''),
            translations: this.buildTranslations(product.name, product.description),
            ingredients: (product.contents && product.contents[this.currentLanguage]) || (product.contents && product.contents.tr) || [],
            extras: [
                ...(Array.isArray(product.options) && product.options.length ? [{
                    type: 'radio',
                    name: 'Servis',
                    translations: { tr: 'Servis', en: 'Serving', de: 'Servieren', ru: 'Подача', fr: 'Service', ar: 'تقديم' },
                    options: product.options.map(option => ({
                        id: option.id,
                        name: option.label?.[this.currentLanguage] || option.label?.tr || option.label?.en || '',
                        translations: {
                            tr: option.label?.tr || '',
                            en: option.label?.en || '',
                            de: option.label?.de || option.label?.en || '',
                            ru: option.label?.ru || option.label?.en || '',
                            fr: option.label?.fr || option.label?.en || '',
                            ar: option.label?.ar || option.label?.en || ''
                        },
                        priceDelta: option.price || 0
                    }))
                }] : [])
            ]
        }));
    }

    mapIceceklerJsonToProducts(iceceklerProducts) {
        if (!Array.isArray(iceceklerProducts)) return [];
        return iceceklerProducts.map(product => ({
            id: product.id,
            category: 'icecekler',
            price: product.price,
            image: this.getLocalImage('icecekler', product.id, product.name?.tr || product.name?.en || ''),
            translations: this.buildTranslations(product.name, product.description),
            ingredients: (product.contents && product.contents[this.currentLanguage]) || (product.contents && product.contents.tr) || [],
            extras: [
                ...(Array.isArray(product.options) && product.options.length ? [{
                    type: 'radio',
                    name: 'Servis',
                    translations: { tr: 'Servis', en: 'Serving', de: 'Servieren', ru: 'Подача', fr: 'Service', ar: 'تقديم' },
                    options: product.options.map(option => ({
                        id: option.id,
                        name: option.label?.[this.currentLanguage] || option.label?.tr || option.label?.en || '',
                        translations: {
                            tr: option.label?.tr || '',
                            en: option.label?.en || '',
                            de: option.label?.de || option.label?.en || '',
                            ru: option.label?.ru || option.label?.en || '',
                            fr: option.label?.fr || option.label?.en || '',
                            ar: option.label?.ar || option.label?.en || ''
                        },
                        priceDelta: option.price || 0
                    }))
                }] : [])
            ]
        }));
    }

    mapDrinksJsonToProducts(drinksProducts) {
        if (!Array.isArray(drinksProducts)) return [];
        return drinksProducts.map(product => ({
            id: product.id,
            category: 'icecekler', // Drinks will be shown under icecekler category
            price: product.price,
            image: this.getLocalImage('icecekler', product.id, product.name?.tr || product.name?.en || ''),
            translations: this.buildTranslations(product.name, product.description),
            ingredients: (product.contents && product.contents[this.currentLanguage]) || (product.contents && product.contents.tr) || [],
            extras: (product.options && product.options.length > 0) ? [{
                type: 'radio',
                name: 'Seçenek',
                translations: { tr: 'Seçenek', en: 'Option', de: 'Option', ru: 'Вариант', fr: 'Option', ar: 'خيار' },
                options: product.options.map(option => ({
                    id: option.id,
                    name: option.label[this.currentLanguage] || option.label.tr,
                    translations: this.buildTranslations(option.label, {}),
                    priceDelta: option.price
                }))
            }] : []
        }));
    }

    mapSaladJsonToProducts(saladProducts) {
        if (!Array.isArray(saladProducts)) return [];
        return saladProducts.map(product => ({
            id: product.id,
            category: 'salata',
            price: product.price,
            image: this.getLocalImage('salata', product.id, product.name?.tr || product.name?.en || ''),
            translations: this.buildTranslations(product.name, product.description),
            ingredients: (product.contents && product.contents[this.currentLanguage]) || (product.contents && product.contents.tr) || [],
            extras: []
        }));
    }

    // JSON dosya adından kategori klasörünü otomatik bul
    getCategoryFolder(jsonFileName) {
        const folderMap = {
            'pizza.json': 'Pizzalar',
            'drinks.json': 'Icecek', 
            'aperatifler.json': 'Aperatifler',
            'beef-doner.json': 'Et-Doner',
            'bistro.json': 'Bistro',
            'chicken-doner.json': 'Tavuk-Doner',
            'hamburger.json': 'Hamburger',
            'kofte.json': 'Kofte-Spesiyel',
            'manti.json': 'Makarnalar',
            'pasta.json': 'Makarnalar',
            'salad.json': 'Salata',
            'toast.json': 'Ayvalik-Tostu',
            'sandwich.json': 'Ayvalik-Tostu' // Soğuk Sandviç için
        };
        return folderMap[jsonFileName] || 'Pizzalar';
    }

    // Ürün adından resim yolunu otomatik oluştur
    getAutoImagePath(productId, productName, categoryFolder) {
        // Özel eşleştirmeler
        const specialMappings = {
            'Margarita Yicem': 'margarita.jpg',
            'Mix Yicem': 'mix-yicem-pizza.jpg',
            'Kavurmalı Yicem': 'kavurmali-yicem.jpg',
            '4 Peynirli Yicem': '4-peynirli-yicem.jpg',
            'Brokoli Yicem': 'brokoli-yicem.jpg',
            'Diavola Yicem': 'diavola-yicem.jpg',
            'Ispanak Tulum Yicem': 'ıspanak-tulum-yicem.jpg',
            'Klasik Yicem': 'klasik-yicem.jpg',
            'Sosisli Yicem': 'sosisli-yicem.jpg',
            'Sucuklu Yicem': 'sucuklu-yicem.jpg',
            'Tavuklu Yicem': 'tavuklu-yicem.jpg',
            'Tonno Yicem': 'tonno-yicem.jpg',
            'Yicem Dönerli': 'donerli-yicem.jpg',
            'Coca Cola': 'cocacola.jpg',
            'Fanta': 'fanta.jpg',
            'Sprite': 'sprite.jpg',
            'Ayran': 'ayran.jpg',
            'Su': 'su.jpg',
            'Çay': 'cay.jpg',
            'Türk Kahvesi': 'turk-kahvesi.jpg',
            'Ice Tea': 'icetea.jpg',
            'Soda': 'soda.jpg',
            'Şalgam': 'salgam.jpg',
            'Red Bull': 'redbull.jpg',
            'Litrelik İçecek': 'litrelikicecek.jpg',
            '4\'lü Cam İçecek': '4lucamicecek.jpg',
            'Çıtır': 'citir.jpg',
            'Elma Dilim Patates': 'elmadilim.jpg',
            'Parmak Patates': 'parmakpatates.jpg',
            'Hamburger': 'hamburger.jpg',
            'Cheeseburger': 'cheeseburger.jpg',
            'Tavuk Burger': 'tavukburger.jpg',
            'Bahar Salata': 'baharsalata.jpg',
            'Çıtır Tavuk Salata': 'citir-tavuk-salata.jpg',
            'Diyet Tavuk Salata': 'diyet-tavuk-salata.jpg',
            'Hellim Salata': 'hellim-salata.jpg',
            'Sezar': 'sezar.jpg',
            'Tonno Salata': 'tonnosalata.jpg',
            'Arabiata': 'arabiata.jpg',
            'Türk Usulü 4 Peynirli': 'turkusulu.jpg',
            'Bolonez': 'bolonez.jpg',
            'Alfredo': 'alfredo.jpg',
            'Pesto': 'pesto.jpg',
            'Ton Balıklı': 'ton-balikli.jpg',
            'Napoliten': 'Napoliten.jpg',
            'Mantı': 'manti.jpg',
            'Sanayi Tostu': 'sanayi-tostu.jpg',
            'Yicem Karışık': 'yicem-karisik.jpg',
            'Yicem Sucuklu': 'yicem-sucuklu.jpg',
            'Yicem Kaşarlı': 'yicem-kasarli.jpg',
            'Yicem Salam': 'yicem-salam.jpg',
            'Yicem Mega Karışık': 'yicem-mega-karisik.jpg',
            'Yicem Super Karışık': 'yicem-super-karisik.jpg',
            'Yicem Dönerli': 'yicem-donerli.jpg',
            'Yicem Ev Köfteli': 'yicem-evkofteli.jpg',
            'Yicem Schnitzel': 'yicem-schnitzel.jpg',
            'Yicem Kavurma': 'yicem-kavurma.jpg',
            'Yicem Yengen': 'yicem-yengen.jpg',
            'Café de Paris': 'cafedeparis.jpg',
            'Barbekü Soslu Tavuk': 'barbekusoslutavuk.jpg',
            'Chicken Quesadilla': 'chicken-quesadilla.jpg',
            'Chicken Stroganoff': 'chicken-stroganoff.jpg',
            'Dağ Kekiği Kremalı': 'dagkekigi-kremali.jpg',
            'Kaşarlı Mantarlı Quesadilla': 'kasarli-mantarli-quesadilla.jpg',
            'Mantarlı Köri Tavuk': 'mantarli-kori-tavuk.jpg',
            'Mexican Soslu Tavuk': 'mexicanososlutavuk.jpg',
            'Tatlı Acı Soslu Tavuk': 'tatliacisoslutavuk.jpg',
            'Tavuk Wrap': 'tavuk-wrap.jpg',
            'Viyana': 'viyana.jpg',
            'Tavuk Döner Beyti': 'tavuk-doner-beyti.jpg',
            'Tavuk Döner Porsiyon': 'tavuk-doner-porsiyon.jpg',
            'Pilavüstü Tavuk Döner': 'pilav-ustu-tavuk-doner.jpg',
            '3 Adet Tavuk Döner': '3lu-tavuk-doner.jpg',
            '5 Adet Tavuk Döner': '5lı-tavuk-doner.jpg',
            'Tavuk İskender': 'tavuk-iskender.jpg',
            'Et Döner Porsiyon': 'et-doner-porsiyon.jpg',
            'Pilavüstü Et Döner': 'pilavustu-etdoner.jpg',
            '3 Adet Et Döner': '3lu-etdoner.jpg',
            '5 Adet Et Döner': '5li-etdoner.jpg',
            'Et İskender': 'et-iskender.jpg',
            'Kaşarlı Et Döner': 'kasarli-etdoner.jpg',
            'Soslu Döner': 'soslu-doner.jpg',
            'Ayvalık Et Döner': 'ayvalik-etdoner.jpg',
            'Ekmek Arası Köfte': 'ekmekarasi.jpg',
            'Ekmek Arası Kaşarlı Köfte': 'kasarli-kofte.jpg',
            'Şefin İzgarası': 'sefin-izgarasi.jpg',
            'Soğuk Sandviç': 'soguk-sandvic.jpg',
            'Kaşarlı Soğuk Sandviç': 'yicem-kasarli.jpg',
            'Tavuklu Soğuk Sandviç': 'yicem-kasarli.jpg',
            'Ton Balıklı Soğuk Sandviç': 'yicem-kasarli.jpg',
            'Sucuklu Soğuk Sandviç': 'yicem-sucuklu.jpg',
            'Salamlı Soğuk Sandviç': 'yicem-salam.jpg',
            'Jambonlu Soğuk Sandviç': 'yicem-kasarli-jambon.jpg',
            'Mantarlı Soğuk Sandviç': 'yicem-kasarli.jpg'
        };
        
        // Özel eşleştirme varsa onu kullan
        if (specialMappings[productName]) {
            const folder = this.resolvePicFolder(categoryFolder);
            return `/pic/${folder}/${specialMappings[productName]}`;
        }
        
        // Yoksa otomatik oluştur
        const cleanName = productName.toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
        
        const folder = this.resolvePicFolder(categoryFolder);
        return `/pic/${folder}/${cleanName}.jpg`;
    }

    // Tüm JSON verilerini otomatik olarak yükle
    getAllProductsFromJson() {
        const allProducts = [];
        
        // Pizza kategorisi
        allProducts.push(...this.mapPizzaJsonToProducts());
        
        // Drinks kategorisi
        allProducts.push(...this.mapDrinksJsonToProducts());
        
        // Aperatifler kategorisi
        allProducts.push(...this.mapAperatiflerJsonToProducts());
        
        // Beef Doner kategorisi
        allProducts.push(...this.mapBeefDonerJsonToProducts());
        
        // Bistro kategorisi
        allProducts.push(...this.mapBistroJsonToProducts());
        
        // Chicken Doner kategorisi
        allProducts.push(...this.mapChickenDonerJsonToProducts());
        
        // Hamburger kategorisi
        allProducts.push(...this.mapHamburgerJsonToProducts());
        
        // Kofte kategorisi
        allProducts.push(...this.mapKofteJsonToProducts());
        
        // Manti kategorisi
        allProducts.push(...this.mapMantiJsonToProducts());
        
        // Pasta kategorisi
        allProducts.push(...this.mapPastaJsonToProducts());
        
        // Salad kategorisi
        allProducts.push(...this.mapSaladJsonToProducts());
        
        // Sandwich kategorisi
        allProducts.push(...this.mapSandwichJsonToProducts());
        
        // Toast kategorisi
        allProducts.push(...this.mapToastJsonToProducts());
        
        return allProducts;
    }

    // Get embedded specific products (kaldırıldı): artık kullanılmıyor, boş döner
    getSpecificProducts() {
        return [
            // kaldırıldı
            {
                id: 'p1',
                category: 'pizzalar',
                price: 180,
                image: './pic/Pizzalar/margarita.jpg',
                translations: {
                    tr: { name: 'Margarita Yicem', description: 'Mozarella Peyniri, Pizza Sosu, Fesleğen, Cherry Domates' },
                    en: { name: 'Margarita Yicem', description: 'Mozzarella Cheese, Pizza Sauce, Basil, Cherry Tomatoes' },
                    de: { name: 'Margarita Yicem', description: 'Mozzarella-Käse, Pizza-Sauce, Basilikum, Kirschtomaten' },
                    ru: { name: 'Маргарита Йицем', description: 'Сыр Моцарелла, Соус для пиццы, Базилик, Черри помидоры' },
                    fr: { name: 'Margarita Yicem', description: 'Fromage Mozzarella, Sauce Pizza, Basilic, Tomates Cerises' },
                    ar: { name: 'مارغريتا يجم', description: 'جبن موزاريلا، صلصة البيتزا، ريحان، طماطم كرزية' }
                },
                ingredients: {
                    tr: ['Pizza Sosu', 'Fesleğen', 'Cherry Domates'],
                    en: ['Pizza Sauce', 'Basil', 'Cherry Tomatoes'],
                    ru: ['Pizza Sosu', 'Базилик', 'Помидоры черри']
                },
                extras: [
                    {
                        type: 'radio',
                        name: 'Boyut',
                        translations: { tr: 'Boyut', en: 'Size', de: 'Größe', ru: 'Размер', fr: 'Taille', ar: 'الحجم' },
                        options: [
                            { id: 'o1', name: 'Small (1 Kişilik)', translations: { tr: 'Small (1 Kişilik)', en: 'Small (1 Person)', de: 'Klein (1 Person)', ru: 'Маленькая (1 человек)', fr: 'Petit (1 personne)', ar: 'صغير (شخص واحد)' }, priceDelta: 0 },
                            { id: 'o2', name: 'Medium (1-2 Kişilik)', translations: { tr: 'Medium (1-2 Kişilik)', en: 'Medium (1-2 People)', de: 'Mittel (1-2 Personen)', ru: 'Средняя (1-2 человека)', fr: 'Moyen (1-2 personnes)', ar: 'متوسط (1-2 أشخاص)' }, priceDelta: 60 },
                            { id: 'o3', name: 'Large (2-3 Kişilik)', translations: { tr: 'Large (2-3 Kişilik)', en: 'Large (2-3 People)', de: 'Groß (2-3 Personen)', ru: 'Большая (2-3 человека)', fr: 'Grand (2-3 personnes)', ar: 'كبير (2-3 أشخاص)' }, priceDelta: 120 },
                            { id: 'o4', name: 'XLarge (3-4 Kişilik)', translations: { tr: 'XLarge (3-4 Kişilik)', en: 'XLarge (3-4 People)', de: 'Extra Groß (3-4 Personen)', ru: 'Очень большая (3-4 человека)', fr: 'Très grand (3-4 personnes)', ar: 'كبير جداً (3-4 أشخاص)' }, priceDelta: 180 }
                        ]
                    }
                ]
            },
            {
                id: 'p2',
                category: 'pizzalar',
                price: 240,
                image: './pic/Pizzalar/mix-yicem-pizza.jpg',
                translations: {
                    tr: { name: 'Mix Yicem', description: 'Mozarella Peyniri, Pizza Sosu, Sucuk, Sosis, Salam, Zeytin, Mısır, Mantar' },
                    en: { name: 'Mix Yicem', description: 'Mozzarella Cheese, Pizza Sauce, Sucuk, Sausage, Salami, Olives, Corn, Mushrooms' },
                    de: { name: 'Mix Yicem', description: 'Mozzarella-Käse, Pizza-Sauce, Sucuk, Wurst, Salami, Oliven, Mais, Pilze' },
                    ru: { name: 'Микс Йицем', description: 'Сыр Моцарелла, Соус для пиццы, Суджук, Колбаса, Салами, Оливки, Кукуруза, Грибы' },
                    fr: { name: 'Mix Yicem', description: 'Fromage Mozzarella, Sauce Pizza, Sucuk, Saucisse, Salami, Olives, Maïs, Champignons' },
                    ar: { name: 'ميكس يجم', description: 'جبن موزاريلا، صلصة البيتزا، سوجق، سجق، سلامي، زيتون، ذرة، فطر' }
                },
                ingredients: ['Pizza Sosu', 'Sucuk', 'Sosis', 'Salam', 'Zeytin', 'Mısır', 'Mantar'],
                extras: [
                    {
                        type: 'radio',
                        name: 'Boyut',
                        translations: { tr: 'Boyut', en: 'Size', de: 'Größe', ru: 'Размер', fr: 'Taille', ar: 'الحجم' },
                        options: [
                            { id: 'o5', name: 'Small (1 Kişilik)', translations: { tr: 'Small (1 Kişilik)', en: 'Small (1 Person)', de: 'Klein (1 Person)', ru: 'Маленькая (1 человек)', fr: 'Petit (1 personne)', ar: 'صغير (شخص واحد)' }, priceDelta: 0 },
                            { id: 'o6', name: 'Medium (1-2 Kişilik)', translations: { tr: 'Medium (1-2 Kişilik)', en: 'Medium (1-2 People)', de: 'Mittel (1-2 Personen)', ru: 'Средняя (1-2 человека)', fr: 'Moyen (1-2 personnes)', ar: 'متوسط (1-2 أشخاص)' }, priceDelta: 60 },
                            { id: 'o7', name: 'Large (2-3 Kişilik)', translations: { tr: 'Large (2-3 Kişilik)', en: 'Large (2-3 People)', de: 'Groß (2-3 Personen)', ru: 'Большая (2-3 человека)', fr: 'Grand (2-3 personnes)', ar: 'كبير (2-3 أشخاص)' }, priceDelta: 120 },
                            { id: 'o8', name: 'XLarge (3-4 Kişilik)', translations: { tr: 'XLarge (3-4 Kişilik)', en: 'XLarge (3-4 People)', de: 'Extra Groß (3-4 Personen)', ru: 'Очень большая (3-4 человека)', fr: 'Très grand (3-4 personnes)', ar: 'كبير جداً (3-4 أشخاص)' }, priceDelta: 180 }
                        ]
                    }
                ]
            },
            {
                id: 'p3',
                category: 'pizzalar',
                price: 300,
                image: './pic/Pizzalar/kavurmali-yicem.jpg',
                translations: {
                    tr: { name: 'Kavurmalı Yicem', description: 'Mozarella, Pizza Sosu, Dana Kavurma, Soğan, Biber, Kekik' },
                    en: { name: 'Beef Stew Yicem', description: 'Mozzarella, Pizza Sauce, Beef Stew, Onion, Pepper, Thyme' },
                    de: { name: 'Rindfleisch-Eintopf Yicem', description: 'Mozzarella, Pizza-Sauce, Rindfleisch-Eintopf, Zwiebel, Paprika, Thymian' },
                    ru: { name: 'Йицем с тушеной говядиной', description: 'Моцарелла, Соус для пиццы, Тушеная говядина, Лук, Перец, Тимьян' },
                    fr: { name: 'Yicem au Ragoût de Bœuf', description: 'Mozzarella, Sauce Pizza, Ragoût de Bœuf, Oignon, Poivron, Thym' },
                    ar: { name: 'يجم باللحم المطبوخ', description: 'موزاريلا، صلصة البيتزا، لحم مطبوخ، بصل، فلفل، زعتر' }
                },
                ingredients: ['Pizza Sosu', 'Dana Kavurma', 'Soğan', 'Biber', 'Kekik'],
                extras: [
                    {
                        type: 'radio',
                        name: 'Boyut',
                        translations: { tr: 'Boyut', en: 'Size', de: 'Größe', ru: 'Размер', fr: 'Taille', ar: 'الحجم' },
                        options: [
                            { id: 'o9', name: 'Small (1 Kişilik)', translations: { tr: 'Small (1 Kişilik)', en: 'Small (1 Person)', de: 'Klein (1 Person)', ru: 'Маленькая (1 человек)', fr: 'Petit (1 personne)', ar: 'صغير (شخص واحد)' }, priceDelta: 0 },
                            { id: 'o10', name: 'Medium (1-2 Kişilik)', translations: { tr: 'Medium (1-2 Kişilik)', en: 'Medium (1-2 People)', de: 'Mittel (1-2 Personen)', ru: 'Средняя (1-2 человека)', fr: 'Moyen (1-2 personnes)', ar: 'متوسط (1-2 أشخاص)' }, priceDelta: 60 },
                            { id: 'o11', name: 'Large (2-3 Kişilik)', translations: { tr: 'Large (2-3 Kişilik)', en: 'Large (2-3 People)', de: 'Groß (2-3 Personen)', ru: 'Большая (2-3 человека)', fr: 'Grand (2-3 personnes)', ar: 'كبير (2-3 أشخاص)' }, priceDelta: 120 },
                            { id: 'o12', name: 'XLarge (3-4 Kişilik)', translations: { tr: 'XLarge (3-4 Kişilik)', en: 'XLarge (3-4 People)', de: 'Extra Groß (3-4 Personen)', ru: 'Очень большая (3-4 человека)', fr: 'Très grand (3-4 personnes)', ar: 'كبير جداً (3-4 أشخاص)' }, priceDelta: 180 }
                        ]
                    }
                ]
            },
            // Drinks kategorisi - JSON'dan gömülü veriler
            {
                id: 'd1',
                category: 'icecekler',
                price: 20,
                image: this.getAutoImagePath('d1', 'Coca Cola', 'Icecek'),
                translations: {
                    tr: { name: 'Coca Cola', description: 'Coca Cola 330ml' },
                    en: { name: 'Coca Cola', description: 'Coca Cola 330ml' },
                    de: { name: 'Coca Cola', description: 'Coca Cola 330ml' },
                    ru: { name: 'Кока-Кола', description: 'Кока-Кола 330мл' },
                    fr: { name: 'Coca Cola', description: 'Coca Cola 330ml' },
                    ar: { name: 'كوكا كولا', description: 'كوكا كولا 330مل' }
                },
                ingredients: [],
                extras: []
            },
            {
                id: 'd2',
                category: 'icecekler',
                price: 20,
                image: this.getAutoImagePath('d2', 'Fanta', 'Icecek'),
                translations: {
                    tr: { name: 'Fanta', description: 'Fanta 330ml' },
                    en: { name: 'Fanta', description: 'Fanta 330ml' },
                    de: { name: 'Fanta', description: 'Fanta 330ml' },
                    ru: { name: 'Фанта', description: 'Фанта 330мл' },
                    fr: { name: 'Fanta', description: 'Fanta 330ml' },
                    ar: { name: 'فانتا', description: 'فانتا 330مل' }
                },
                ingredients: [],
                extras: []
            },
            {
                id: 'd3',
                category: 'icecekler',
                price: 20,
                image: this.getAutoImagePath('d3', 'Sprite', 'Icecek'),
                translations: {
                    tr: { name: 'Sprite', description: 'Sprite 330ml' },
                    en: { name: 'Sprite', description: 'Sprite 330ml' },
                    de: { name: 'Sprite', description: 'Sprite 330ml' },
                    ru: { name: 'Спрайт', description: 'Спрайт 330мл' },
                    fr: { name: 'Sprite', description: 'Sprite 330ml' },
                    ar: { name: 'سبرايت', description: 'سبرايت 330مل' }
                },
                ingredients: [],
                extras: []
            },
            {
                id: 'd4',
                category: 'icecekler',
                price: 30,
                image: this.getAutoImagePath('d4', 'Ayran', 'Icecek'),
                translations: {
                    tr: { name: 'Ayran', description: 'Ayran 250ml' },
                    en: { name: 'Ayran', description: 'Ayran 250ml' },
                    de: { name: 'Ayran', description: 'Ayran 250ml' },
                    ru: { name: 'Айран', description: 'Айран 250мл' },
                    fr: { name: 'Ayran', description: 'Ayran 250ml' },
                    ar: { name: 'عيران', description: 'عيران 250مل' }
                },
                ingredients: [],
                extras: []
            },
            {
                id: 'd5',
                category: 'icecekler',
                price: 15,
                image: this.getAutoImagePath('d5', 'Su', 'Icecek'),
                translations: {
                    tr: { name: 'Su', description: 'Su 500ml' },
                    en: { name: 'Water', description: 'Water 500ml' },
                    de: { name: 'Wasser', description: 'Wasser 500ml' },
                    ru: { name: 'Вода', description: 'Вода 500мл' },
                    fr: { name: 'Eau', description: 'Eau 500ml' },
                    ar: { name: 'ماء', description: 'ماء 500مل' }
                },
                ingredients: [],
                extras: []
            },
            {
                id: 'd6',
                category: 'icecekler',
                price: 25,
                image: this.getAutoImagePath('d6', 'Çay', 'Icecek'),
                translations: {
                    tr: { name: 'Çay', description: 'Çay' },
                    en: { name: 'Tea', description: 'Tea' },
                    de: { name: 'Tee', description: 'Tee' },
                    ru: { name: 'Чай', description: 'Чай' },
                    fr: { name: 'Thé', description: 'Thé' },
                    ar: { name: 'شاي', description: 'شاي' }
                },
                ingredients: [],
                extras: []
            },
            {
                id: 'd7',
                category: 'icecekler',
                price: 35,
                image: this.getAutoImagePath('d7', 'Türk Kahvesi', 'Icecek'),
                translations: {
                    tr: { name: 'Türk Kahvesi', description: 'Türk Kahvesi' },
                    en: { name: 'Turkish Coffee', description: 'Turkish Coffee' },
                    de: { name: 'Türkischer Kaffee', description: 'Türkischer Kaffee' },
                    ru: { name: 'Турецкий кофе', description: 'Турецкий кофе' },
                    fr: { name: 'Café Turc', description: 'Café Turc' },
                    ar: { name: 'قهوة تركية', description: 'قهوة تركية' }
                },
                ingredients: [],
                extras: []
            },
            {
                id: 'd8',
                category: 'icecekler',
                price: 30,
                image: this.getAutoImagePath('d8', 'Ice Tea', 'Icecek'),
                translations: {
                    tr: { name: 'Ice Tea', description: 'Ice Tea 330ml' },
                    en: { name: 'Ice Tea', description: 'Ice Tea 330ml' },
                    de: { name: 'Eistee', description: 'Eistee 330ml' },
                    ru: { name: 'Холодный чай', description: 'Холодный чай 330мл' },
                    fr: { name: 'Thé Glacé', description: 'Thé Glacé 330ml' },
                    ar: { name: 'شاي مثلج', description: 'شاي مثلج 330مل' }
                },
                ingredients: [],
                extras: []
            },
            {
                id: 'd9',
                category: 'icecekler',
                price: 25,
                image: this.getAutoImagePath('d9', 'Soda', 'Icecek'),
                translations: {
                    tr: { name: 'Soda', description: 'Soda 330ml' },
                    en: { name: 'Soda', description: 'Soda 330ml' },
                    de: { name: 'Soda', description: 'Soda 330ml' },
                    ru: { name: 'Содовая', description: 'Содовая 330мл' },
                    fr: { name: 'Soda', description: 'Soda 330ml' },
                    ar: { name: 'صودا', description: 'صودا 330مل' }
                },
                ingredients: [],
                extras: []
            },
            {
                id: 'd10',
                category: 'icecekler',
                price: 30,
                image: this.getAutoImagePath('d10', 'Şalgam', 'Icecek'),
                translations: {
                    tr: { name: 'Şalgam', description: 'Şalgam 250ml' },
                    en: { name: 'Şalgam', description: 'Şalgam 250ml' },
                    de: { name: 'Şalgam', description: 'Şalgam 250ml' },
                    ru: { name: 'Шалгам', description: 'Шалгам 250мл' },
                    fr: { name: 'Şalgam', description: 'Şalgam 250ml' },
                    ar: { name: 'شلغم', description: 'شلغم 250مل' }
                },
                ingredients: [],
                extras: []
            },
            {
                id: 'd11',
                category: 'icecekler',
                price: 50,
                image: this.getAutoImagePath('d11', 'Red Bull', 'Icecek'),
                translations: {
                    tr: { name: 'Red Bull', description: 'Red Bull 250ml' },
                    en: { name: 'Red Bull', description: 'Red Bull 250ml' },
                    de: { name: 'Red Bull', description: 'Red Bull 250ml' },
                    ru: { name: 'Ред Булл', description: 'Ред Булл 250мл' },
                    fr: { name: 'Red Bull', description: 'Red Bull 250ml' },
                    ar: { name: 'ريد بول', description: 'ريد بول 250مل' }
                },
                ingredients: [],
                extras: []
            },
            {
                id: 'd12',
                category: 'icecekler',
                price: 40,
                image: this.getAutoImagePath('d12', 'Litrelik İçecek', 'Icecek'),
                translations: {
                    tr: { name: 'Litrelik İçecek', description: 'Litrelik İçecek' },
                    en: { name: 'Liter Drink', description: 'Liter Drink' },
                    de: { name: 'Litergetränk', description: 'Litergetränk' },
                    ru: { name: 'Литровый напиток', description: 'Литровый напиток' },
                    fr: { name: 'Boisson d\'un Litre', description: 'Boisson d\'un Litre' },
                    ar: { name: 'مشروب لتر', description: 'مشروب لتر' }
                },
                ingredients: [],
                extras: []
            },
            {
                id: 'd13',
                category: 'icecekler',
                price: 60,
                image: this.getAutoImagePath('d13', '4\'lü Cam İçecek', 'Icecek'),
                translations: {
                    tr: { name: '4\'lü Cam İçecek', description: '4\'lü Cam İçecek' },
                    en: { name: '4 Glass Drinks', description: '4 Glass Drinks' },
                    de: { name: '4 Glasgetränke', description: '4 Glasgetränke' },
                    ru: { name: '4 стакана напитков', description: '4 стакана напитков' },
                    fr: { name: '4 Boissons en Verre', description: '4 Boissons en Verre' },
                    ar: { name: '4 مشروبات زجاجية', description: '4 مشروبات زجاجية' }
                },
                ingredients: [],
                extras: []
            },
            // Aperatifler kategorisi - JSON'dan gömülü veriler
            {
                id: 'a1',
                category: 'aperatifler',
                price: 40,
                image: this.getAutoImagePath('a1', 'Çıtır', 'Aperatifler'),
                translations: {
                    tr: { name: 'Çıtır', description: 'Çıtır Patates' },
                    en: { name: 'Crispy', description: 'Crispy Potatoes' },
                    de: { name: 'Knusprig', description: 'Knusprige Kartoffeln' },
                    ru: { name: 'Хрустящий', description: 'Хрустящий картофель' },
                    fr: { name: 'Croustillant', description: 'Pommes de Terre Croustillantes' },
                    ar: { name: 'مقرمش', description: 'بطاطس مقرمشة' }
                },
                ingredients: ['Patates', 'Tuz', 'Yağ'],
                extras: []
            },
            {
                id: 'a2',
                category: 'aperatifler',
                price: 35,
                image: this.getAutoImagePath('a2', 'Elma Dilim Patates', 'Aperatifler'),
                translations: {
                    tr: { name: 'Elma Dilim Patates', description: 'Elma Dilim Patates' },
                    en: { name: 'Apple Slice Potatoes', description: 'Apple Slice Potatoes' },
                    de: { name: 'Apfelscheiben Kartoffeln', description: 'Apfelscheiben Kartoffeln' },
                    ru: { name: 'Картофель ломтиками', description: 'Картофель ломтиками' },
                    fr: { name: 'Pommes de Terre en Tranches', description: 'Pommes de Terre en Tranches' },
                    ar: { name: 'بطاطس شرائح', description: 'بطاطس شرائح' }
                },
                ingredients: ['Patates', 'Tuz', 'Yağ'],
                extras: []
            },
            {
                id: 'a3',
                category: 'aperatifler',
                price: 45,
                image: this.getAutoImagePath('a3', 'Parmak Patates', 'Aperatifler'),
                translations: {
                    tr: { name: 'Parmak Patates', description: 'Parmak Patates' },
                    en: { name: 'Finger Potatoes', description: 'Finger Potatoes' },
                    de: { name: 'Fingerkartoffeln', description: 'Fingerkartoffeln' },
                    ru: { name: 'Картофель пальчики', description: 'Картофель пальчики' },
                    fr: { name: 'Pommes de Terre en Bâtonnets', description: 'Pommes de Terre en Bâtonnets' },
                    ar: { name: 'بطاطس أصابع', description: 'بطاطس أصابع' }
                },
                ingredients: ['Patates', 'Tuz', 'Yağ'],
                extras: []
            },
            // Köfte Spesiyel kategorisi - JSON'dan gömülü veriler
            {
                id: 'k1',
                category: 'kofte-spesiyel',
                price: 120,
                image: this.getAutoImagePath('k1', 'Ekmek Arası Köfte', 'Kofte-Spesiyel'),
                translations: {
                    tr: { name: 'Ekmek Arası Köfte', description: 'Ekmek Arası Köfte' },
                    en: { name: 'Bread with Meatball', description: 'Bread with Meatball' },
                    de: { name: 'Brot mit Fleischbällchen', description: 'Brot mit Fleischbällchen' },
                    ru: { name: 'Хлеб с фрикадельками', description: 'Хлеб с фрикадельками' },
                    fr: { name: 'Pain aux Boulettes', description: 'Pain aux Boulettes' },
                    ar: { name: 'خبز مع كفتة', description: 'خبز مع كفتة' }
                },
                ingredients: ['Köfte', 'Ekmek', 'Soğan', 'Domates'],
                extras: []
            },
            {
                id: 'k2',
                category: 'kofte-spesiyel',
                price: 140,
                image: this.getAutoImagePath('k2', 'Ekmek Arası Kaşarlı Köfte', 'Kofte-Spesiyel'),
                translations: {
                    tr: { name: 'Ekmek Arası Kaşarlı Köfte', description: 'Ekmek Arası Kaşarlı Köfte' },
                    en: { name: 'Bread with Cheesy Meatball', description: 'Bread with Cheesy Meatball' },
                    de: { name: 'Brot mit Käse-Fleischbällchen', description: 'Brot mit Käse-Fleischbällchen' },
                    ru: { name: 'Хлеб с сырными фрикадельками', description: 'Хлеб с сырными фрикадельками' },
                    fr: { name: 'Pain aux Boulettes au Fromage', description: 'Pain aux Boulettes au Fromage' },
                    ar: { name: 'خبز مع كفتة بالجبن', description: 'خبز مع كفتة بالجبن' }
                },
                ingredients: ['Köfte', 'Kaşar Peyniri', 'Ekmek', 'Soğan'],
                extras: []
            },
            {
                id: 'k3',
                category: 'kofte-spesiyel',
                price: 180,
                image: this.getAutoImagePath('k3', 'Şefin İzgarası', 'Kofte-Spesiyel'),
                translations: {
                    tr: { name: 'Şefin İzgarası', description: 'Şefin İzgarası' },
                    en: { name: 'Chef\'s Grill', description: 'Chef\'s Grill' },
                    de: { name: 'Chef-Grill', description: 'Chef-Grill' },
                    ru: { name: 'Гриль шефа', description: 'Гриль шефа' },
                    fr: { name: 'Grill du Chef', description: 'Grill du Chef' },
                    ar: { name: 'شواء الشيف', description: 'شواء الشيف' }
                },
                ingredients: ['Köfte', 'Izgara', 'Pilav', 'Salata', 'Soğan'],
                extras: []
            },
            {
                id: 'ekmek-arasi-kofte',
                category: 'kofte-spesiyel',
                price: 120,
                image: './images/kasarli-kofte.jpg',
                translations: {
                    tr: { name: 'Ekmek Arası Köfte', description: 'Ekmek Arası Köfte' },
                    en: { name: 'Bread with Meatball', description: 'Bread with Meatball' },
                    de: { name: 'Brot mit Fleischbällchen', description: 'Brot mit Fleischbällchen' },
                    ru: { name: 'Хлеб с фрикадельками', description: 'Хлеб с фрикадельками' },
                    fr: { name: 'Pain aux Boulettes', description: 'Pain aux Boulettes' },
                    ar: { name: 'خبز مع كفتة', description: 'خبز مع كفتة' }
                },
                ingredients: ['Köfte', 'Ekmek', 'Soğan', 'Domates'],
                extras: []
            },
            // Soğuk Sandviç kategorisi - JSON'dan gömülü veriler
            {
                id: 'ss1',
                category: 'soguk-sandvic',
                price: 220,
                image: './pic/Ayvalik-Tostu/soguk-sandvic.jpg',
                translations: {
                    tr: { name: 'Soğuk Sandviç', description: '2 Ana Ürün ve 4 Yan Ürün Seçin' },
                    en: { name: 'Cold Sandwich', description: 'Select 2 Main and 4 Side Items' },
                    de: { name: 'Kaltes Sandwich', description: 'Wählen Sie 2 Haupt- und 4 Beilagen' },
                    ru: { name: 'Холодный сэндвич', description: 'Выберите 2 основных и 4 гарнира' },
                    fr: { name: 'Sandwich Froid', description: 'Sélectionnez 2 principaux et 4 accompagnements' },
                    ar: { name: 'ساندويتش بارد', description: 'اختر عنصرين رئيسيين و4 جوانب' }
                },
                ingredients: [],
                extras: [
                    {
                        type: 'radio',
                        name: 'Servis',
                        translations: { tr: 'Servis', en: 'Serving', de: 'Servieren', ru: 'Подача', fr: 'Service', ar: 'تقديم' },
                        options: [
                            { id: 'ss1_s1', name: 'Tek', translations: { tr: 'Tek', en: 'Single', de: 'Einzeln', ru: 'Одиночный', fr: 'Seul', ar: 'فرادى' }, priceDelta: 0 },
                            { id: 'ss1_s2', name: 'Menü (Cips + İçecek)', translations: { tr: 'Menü (Cips + İçecek)', en: 'Menu (Chips + Drink)', de: 'Menü (Chips + Getränk)', ru: 'Меню (Чипсы + Напиток)', fr: 'Menu (Chips + Boisson)', ar: 'قائمة (شيبس + مشروب)' }, priceDelta: 80 }
                        ]
                    },
                    {
                        type: 'checkbox',
                        name: 'Ana Ürünler (2 seçim)',
                        translations: { tr: 'Ana Ürünler (2 seçim)', en: 'Main Products (choose 2)', de: 'Hauptprodukte (2 wählen)', ru: 'Основные продукты (выбрать 2)', fr: 'Produits principaux (choisir 2)', ar: 'المنتجات الرئيسية (اختياران)' },
                        options: [
                            { id: 'm1', name: 'Ton Balığı', translations: { tr: 'Ton Balığı', en: 'Tuna', de: 'Thunfisch', ru: 'Тунец', fr: 'Thon', ar: 'تونة' }, priceDelta: 0 },
                            { id: 'm2', name: 'Beyaz Peynir', translations: { tr: 'Beyaz Peynir', en: 'White Cheese', de: 'Weißkäse', ru: 'Брынза', fr: 'Fromage Blanc', ar: 'جبنة بيضاء' }, priceDelta: 0 },
                            { id: 'm3', name: 'Ezine', translations: { tr: 'Ezine', en: 'Ezine Cheese', de: 'Ezine Käse', ru: 'Сыр Эзине', fr: 'Fromage Ezine', ar: 'جبن إزينه' }, priceDelta: 0 },
                            { id: 'm4', name: 'Kaşar', translations: { tr: 'Kaşar', en: 'Kashar', de: 'Kasar', ru: 'Кашар', fr: 'Kashar', ar: 'كاشار' }, priceDelta: 0 },
                            { id: 'm5', name: 'Salam', translations: { tr: 'Salam', en: 'Salami', de: 'Salami', ru: 'Салями', fr: 'Salami', ar: 'سالمى' }, priceDelta: 0 },
                            { id: 'm6', name: 'Jambon', translations: { tr: 'Jambon', en: 'Ham', de: 'Schinken', ru: 'Ветчина', fr: 'Jambon', ar: 'لحم' }, priceDelta: 0 }
                        ]
                    },
                    {
                        type: 'checkbox',
                        name: 'Yan Ürünler (4 seçim)',
                        translations: { tr: 'Yan Ürünler (4 seçim)', en: 'Side Products (choose 4)', de: 'Beilagen (4 wählen)', ru: 'Гарниры (выбрать 4)', fr: 'Accompagnements (choisir 4)', ar: 'المنتجات الجانبية (4 اختيارات)' },
                        options: [
                            { id: 'y1', name: 'Siyah Zeytin', translations: { tr: 'Siyah Zeytin', en: 'Black Olive', de: 'Schwarze Olive', ru: 'Чёрная оливка', fr: 'Olive noire', ar: 'زيتون أسود' }, priceDelta: 0 },
                            { id: 'y2', name: 'Mısır', translations: { tr: 'Mısır', en: 'Corn', de: 'Mais', ru: 'Кукуруза', fr: 'Maïs', ar: 'ذرة' }, priceDelta: 0 },
                            { id: 'y3', name: 'Domates', translations: { tr: 'Domates', en: 'Tomato', de: 'Tomate', ru: 'Помидор', fr: 'Tomate', ar: 'طماطم' }, priceDelta: 0 },
                            { id: 'y4', name: 'Turşu', translations: { tr: 'Turşu', en: 'Pickles', de: 'Essiggurke', ru: 'Маринад', fr: 'Cornichon', ar: 'مخلل' }, priceDelta: 0 },
                            { id: 'y5', name: 'Jalepeno Biber', translations: { tr: 'Jalepeno Biber', en: 'Jalapeño', de: 'Jalapeño', ru: 'Халапеньо', fr: 'Jalapeño', ar: 'هالبينو' }, priceDelta: 0 },
                            { id: 'y6', name: 'Yeşil Biber', translations: { tr: 'Yeşil Biber', en: 'Green Pepper', de: 'Grüne Paprika', ru: 'Зелёный перец', fr: 'Poivron vert', ar: 'فلفل أخضر' }, priceDelta: 0 },
                            { id: 'y7', name: 'Rus Salatası', translations: { tr: 'Rus Salatası', en: 'Russian Salad', de: 'Russischer Salat', ru: 'Оливье', fr: 'Salade Russe', ar: 'سلطة روسية' }, priceDelta: 0 }
                        ]
                    }
                ]
            },
            // (ss2-ss8) kaldırıldı: Soğuk Sandviç tek ürün olarak gösterilecek
            
            
            
            
            
            
            {
                id: 'ekmek-arasi-kasarli-kofte',
                category: 'kofte-spesiyel',
                price: 140,
                image: './images/kasarli-kofte.jpg',
                translations: {
                    tr: { name: 'Ekmek Arası Kaşarlı Köfte', description: 'Ekmek Arası Kaşarlı Köfte' },
                    en: { name: 'Bread with Cheesy Meatball', description: 'Bread with Cheesy Meatball' },
                    de: { name: 'Brot mit Käse-Fleischbällchen', description: 'Brot mit Käse-Fleischbällchen' },
                    ru: { name: 'Хлеб с сырными фрикадельками', description: 'Хлеб с сырными фрикадельками' },
                    fr: { name: 'Pain aux Boulettes au Fromage', description: 'Pain aux Boulettes au Fromage' },
                    ar: { name: 'خبز مع كفتة بالجبن', description: 'خبز مع كفتة بالجبن' }
                },
                ingredients: ['Köfte', 'Kaşar Peyniri', 'Ekmek', 'Soğan'],
                extras: []
            },
            // Makarnalar kategorisi - JSON'dan gömülü veriler
            {
                id: 'm1',
                category: 'makarnalar',
                price: 150,
                image: this.getAutoImagePath('m1', 'Arabiata', 'Makarnalar'),
                translations: {
                    tr: { name: 'Arabiata', description: 'Arabiata Makarna' },
                    en: { name: 'Arrabbiata', description: 'Arrabbiata Pasta' },
                    de: { name: 'Arrabbiata', description: 'Arrabbiata Pasta' },
                    ru: { name: 'Аррабиата', description: 'Паста Аррабиата' },
                    fr: { name: 'Arrabbiata', description: 'Pâtes Arrabbiata' },
                    ar: { name: 'أرابياتا', description: 'معكرونة أرابياتا' }
                },
                ingredients: ['Makarna', 'Domates Sosu', 'Sarımsak', 'Biber'],
                extras: []
            },
            {
                id: 'm2',
                category: 'makarnalar',
                price: 180,
                image: this.getAutoImagePath('m2', 'Türk Usulü 4 Peynirli', 'Makarnalar'),
                translations: {
                    tr: { name: 'Türk Usulü 4 Peynirli', description: 'Türk Usulü 4 Peynirli Makarna' },
                    en: { name: 'Turkish Style 4 Cheese', description: 'Turkish Style 4 Cheese Pasta' },
                    de: { name: 'Türkischer Stil 4 Käse', description: 'Türkischer Stil 4 Käse Pasta' },
                    ru: { name: 'Турецкий стиль 4 сыра', description: 'Паста турецкий стиль 4 сыра' },
                    fr: { name: 'Style Turc 4 Fromages', description: 'Pâtes Style Turc 4 Fromages' },
                    ar: { name: 'أسلوب تركي 4 أجبان', description: 'معكرونة أسلوب تركي 4 أجبان' }
                },
                ingredients: ['Makarna', '4 Çeşit Peynir', 'Krema', 'Baharat'],
                extras: []
            },
            {
                id: 'm3',
                category: 'makarnalar',
                price: 160,
                image: this.getAutoImagePath('m3', 'Bolonez', 'Makarnalar'),
                translations: {
                    tr: { name: 'Bolonez', description: 'Bolonez Makarna' },
                    en: { name: 'Bolognese', description: 'Bolognese Pasta' },
                    de: { name: 'Bolognese', description: 'Bolognese Pasta' },
                    ru: { name: 'Болоньезе', description: 'Паста Болоньезе' },
                    fr: { name: 'Bolognaise', description: 'Pâtes Bolognaise' },
                    ar: { name: 'بولونيز', description: 'معكرونة بولونيز' }
                },
                ingredients: ['Makarna', 'Dana Kıyma', 'Domates Sosu', 'Soğan', 'Sarımsak'],
                extras: []
            },
            {
                id: 'm4',
                category: 'makarnalar',
                price: 170,
                image: this.getAutoImagePath('m4', 'Alfredo', 'Makarnalar'),
                translations: {
                    tr: { name: 'Alfredo', description: 'Alfredo Makarna' },
                    en: { name: 'Alfredo', description: 'Alfredo Pasta' },
                    de: { name: 'Alfredo', description: 'Alfredo Pasta' },
                    ru: { name: 'Альфредо', description: 'Паста Альфредо' },
                    fr: { name: 'Alfredo', description: 'Pâtes Alfredo' },
                    ar: { name: 'ألفريدو', description: 'معكرونة ألفريدو' }
                },
                ingredients: ['Makarna', 'Krema', 'Parmesan Peyniri', 'Sarımsak'],
                extras: []
            },
            {
                id: 'm5',
                category: 'makarnalar',
                price: 140,
                image: this.getAutoImagePath('m5', 'Pesto', 'Makarnalar'),
                translations: {
                    tr: { name: 'Pesto', description: 'Pesto Makarna' },
                    en: { name: 'Pesto', description: 'Pesto Pasta' },
                    de: { name: 'Pesto', description: 'Pesto Pasta' },
                    ru: { name: 'Песто', description: 'Паста Песто' },
                    fr: { name: 'Pesto', description: 'Pâtes Pesto' },
                    ar: { name: 'بيستو', description: 'معكرونة بيستو' }
                },
                ingredients: ['Makarna', 'Pesto Sosu', 'Fesleğen', 'Parmesan Peyniri'],
                extras: []
            },
            {
                id: 'm6',
                category: 'makarnalar',
                price: 200,
                image: this.getAutoImagePath('m6', 'Ton Balıklı', 'Makarnalar'),
                translations: {
                    tr: { name: 'Ton Balıklı', description: 'Ton Balıklı Makarna' },
                    en: { name: 'Tuna', description: 'Tuna Pasta' },
                    de: { name: 'Thunfisch', description: 'Thunfisch Pasta' },
                    ru: { name: 'С тунцом', description: 'Паста с тунцом' },
                    fr: { name: 'Au Thon', description: 'Pâtes au Thon' },
                    ar: { name: 'بالتونة', description: 'معكرونة بالتونة' }
                },
                ingredients: ['Makarna', 'Ton Balığı', 'Domates', 'Soğan', 'Sarımsak'],
                extras: []
            },
            {
                id: 'm7',
                category: 'makarnalar',
                price: 180,
                image: this.getAutoImagePath('m7', 'Napoliten', 'Makarnalar'),
                translations: {
                    tr: { name: 'Napoliten', description: 'Napoliten Makarna' },
                    en: { name: 'Neapolitan', description: 'Neapolitan Pasta' },
                    de: { name: 'Neapolitanisch', description: 'Neapolitanische Pasta' },
                    ru: { name: 'Неаполитанский', description: 'Неаполитанская паста' },
                    fr: { name: 'Néapolitain', description: 'Pâtes Néapolitaines' },
                    ar: { name: 'نابولي', description: 'معكرونة نابولي' }
                },
                ingredients: ['Makarna', 'Domates Sosu', 'Mozzarella', 'Fesleğen'],
                extras: []
            },
            {
                id: 'm8',
                category: 'makarnalar',
                price: 120,
                image: this.getAutoImagePath('m8', 'Mantı', 'Makarnalar'),
                translations: {
                    tr: { name: 'Mantı', description: 'Mantı' },
                    en: { name: 'Manti', description: 'Manti' },
                    de: { name: 'Manti', description: 'Manti' },
                    ru: { name: 'Манты', description: 'Манты' },
                    fr: { name: 'Manti', description: 'Manti' },
                    ar: { name: 'مانتي', description: 'مانتي' }
                },
                ingredients: ['Hamur', 'Dana Kıyma', 'Soğan', 'Yoğurt', 'Sarımsak'],
                extras: []
            },
            {
                id: 'arabiata',
                category: 'makarnalar',
                price: 150,
                image: './images/arabiata.jpg',
                translations: {
                    tr: { name: 'Arabiata', description: 'Arabiata Makarna' },
                    en: { name: 'Arrabbiata', description: 'Arrabbiata Pasta' },
                    de: { name: 'Arrabbiata', description: 'Arrabbiata Pasta' },
                    ru: { name: 'Аррабиата', description: 'Паста Аррабиата' },
                    fr: { name: 'Arrabbiata', description: 'Pâtes Arrabbiata' },
                    ar: { name: 'أرابياتا', description: 'معكرونة أرابياتا' }
                },
                ingredients: ['Makarna', 'Domates Sosu', 'Sarımsak', 'Biber'],
                extras: []
            },
            {
                id: 'turk-usulu-4-peynirli',
                category: 'makarnalar',
                price: 180,
                image: './images/turkusulu.jpg',
                translations: {
                    tr: { name: 'Türk Usulü 4 Peynirli', description: 'Türk Usulü 4 Peynirli Makarna' },
                    en: { name: 'Turkish Style 4 Cheese', description: 'Turkish Style 4 Cheese Pasta' },
                    de: { name: 'Türkischer Stil 4 Käse', description: 'Türkischer Stil 4 Käse Pasta' },
                    ru: { name: 'Турецкий стиль 4 сыра', description: 'Паста турецкий стиль 4 сыра' },
                    fr: { name: 'Style Turc 4 Fromages', description: 'Pâtes Style Turc 4 Fromages' },
                    ar: { name: 'أسلوب تركي 4 أجبان', description: 'معكرونة أسلوب تركي 4 أجبان' }
                },
                ingredients: ['Makarna', '4 Çeşit Peynir', 'Krema', 'Baharat'],
                extras: []
            },
            // Pizzalar kategorisi - JSON'dan gömülü veriler (devam)
            {
                id: 'p4',
                category: 'pizzalar',
                price: 300,
                image: './pic/Pizzalar/4-peynirli-yicem.jpg',
                translations: {
                    tr: { name: '4 Peynirli Yicem', description: 'Mozarella Peyniri, Ezine Peyniri, Taze Kaşar, Bergama Tulumu, Pizza Sosu, Fesleğen, Cherry Domates' },
                    en: { name: '4 Cheese Yicem', description: '4 Cheese Yicem Pizza' },
                    de: { name: '4 Käse Yicem', description: '4 Käse Yicem Pizza' },
                    ru: { name: 'Йицем 4 сыра', description: 'Пицца Йицем 4 сыра' },
                    fr: { name: 'Yicem 4 Fromages', description: 'Pizza Yicem 4 Fromages' },
                    ar: { name: 'يجم 4 أجبان', description: 'بيتزا يجم 4 أجبان' }
                },
                ingredients: ['Pizza Sosu', '4 Çeşit Peynir', 'Fesleğen'],
                extras: [
                    {
                        type: 'radio',
                        name: 'Boyut',
                        translations: { tr: 'Boyut', en: 'Size', de: 'Größe', ru: 'Размер', fr: 'Taille', ar: 'الحجم' },
                        options: [
                            { id: 'o13', name: 'Small (1 Kişilik)', translations: { tr: 'Small (1 Kişilik)', en: 'Small (1 Person)', de: 'Klein (1 Person)', ru: 'Маленькая (1 человек)', fr: 'Petit (1 personne)', ar: 'صغير (شخص واحد)' }, priceDelta: 0 },
                            { id: 'o14', name: 'Medium (1-2 Kişilik)', translations: { tr: 'Medium (1-2 Kişilik)', en: 'Medium (1-2 People)', de: 'Mittel (1-2 Personen)', ru: 'Средняя (1-2 человека)', fr: 'Moyen (1-2 personnes)', ar: 'متوسط (1-2 أشخاص)' }, priceDelta: 60 },
                            { id: 'o15', name: 'Large (2-3 Kişilik)', translations: { tr: 'Large (2-3 Kişilik)', en: 'Large (2-3 People)', de: 'Groß (2-3 Personen)', ru: 'Большая (2-3 человека)', fr: 'Grand (2-3 personnes)', ar: 'كبير (2-3 أشخاص)' }, priceDelta: 120 },
                            { id: 'o16', name: 'XLarge (3-4 Kişilik)', translations: { tr: 'XLarge (3-4 Kişilik)', en: 'XLarge (3-4 People)', de: 'Extra Groß (3-4 Personen)', ru: 'Очень большая (3-4 человека)', fr: 'Très grand (3-4 personnes)', ar: 'كبير جداً (3-4 أشخاص)' }, priceDelta: 180 }
                        ]
                    }
                ]
            },
            {
                id: 'p5',
                category: 'pizzalar',
                price: 250,
                image: './pic/Pizzalar/brokoli-yicem.jpg',
                translations: {
                    tr: { name: 'Brokoli & Beyaz Peynirli Yicem', description: 'Pizza Sosu, Brokoli, Beyaz Peynir, Fesleğen' },
                    en: { name: 'Broccoli & White Cheese Yicem', description: 'Pizza Sauce, Broccoli, White Cheese, Basil' },
                    de: { name: 'Brokkoli Yicem', description: 'Brokkoli Yicem Pizza' },
                    ru: { name: 'Йицем с брокколи', description: 'Пицца Йицем с брокколи' },
                    fr: { name: 'Yicem aux Brocolis', description: 'Pizza Yicem aux Brocolis' },
                    ar: { name: 'يجم بالبروكلي', description: 'بيتزا يجم بالبروكلي' }
                },
                ingredients: ['Pizza Sosu', 'Brokoli', 'Peynir', 'Fesleğen'],
                extras: [
                    {
                        type: 'radio',
                        name: 'Boyut',
                        translations: { tr: 'Boyut', en: 'Size', de: 'Größe', ru: 'Размер', fr: 'Taille', ar: 'الحجم' },
                        options: [
                            { id: 'o17', name: 'Small (1 Kişilik)', translations: { tr: 'Small (1 Kişilik)', en: 'Small (1 Person)', de: 'Klein (1 Person)', ru: 'Маленькая (1 человек)', fr: 'Petit (1 personne)', ar: 'صغير (شخص واحد)' }, priceDelta: 0 },
                            { id: 'o18', name: 'Medium (1-2 Kişilik)', translations: { tr: 'Medium (1-2 Kişilik)', en: 'Medium (1-2 People)', de: 'Mittel (1-2 Personen)', ru: 'Средняя (1-2 человека)', fr: 'Moyen (1-2 personnes)', ar: 'متوسط (1-2 أشخاص)' }, priceDelta: 60 },
                            { id: 'o19', name: 'Large (2-3 Kişilik)', translations: { tr: 'Large (2-3 Kişilik)', en: 'Large (2-3 People)', de: 'Groß (2-3 Personen)', ru: 'Большая (2-3 человека)', fr: 'Grand (2-3 personnes)', ar: 'كبير (2-3 أشخاص)' }, priceDelta: 120 },
                            { id: 'o20', name: 'XLarge (3-4 Kişilik)', translations: { tr: 'XLarge (3-4 Kişilik)', en: 'XLarge (3-4 People)', de: 'Extra Groß (3-4 Personen)', ru: 'Очень большая (3-4 человека)', fr: 'Très grand (3-4 personnes)', ar: 'كبير جداً (3-4 أشخاص)' }, priceDelta: 180 }
                        ]
                    }
                ]
            },
            {
                id: 'p6',
                category: 'pizzalar',
                price: 240,
                image: './pic/Pizzalar/diavola-yicem.jpg',
                translations: {
                    tr: { name: 'Diavola Yicem', description: 'Diavola Yicem Pizza' },
                    en: { name: 'Diavola Yicem', description: 'Diavola Yicem Pizza' },
                    de: { name: 'Diavola Yicem', description: 'Diavola Yicem Pizza' },
                    ru: { name: 'Йицем Диавола', description: 'Пицца Йицем Диавола' },
                    fr: { name: 'Yicem Diavola', description: 'Pizza Yicem Diavola' },
                    ar: { name: 'يجم ديافولا', description: 'بيتزا يجم ديافولا' }
                },
                ingredients: ['Pizza Sosu', 'Sucuk', 'Biber', 'Sarımsak', 'Acı Sos'],
                extras: [
                    {
                        type: 'radio',
                        name: 'Boyut',
                        translations: { tr: 'Boyut', en: 'Size', de: 'Größe', ru: 'Размер', fr: 'Taille', ar: 'الحجم' },
                        options: [
                            { id: 'o21', name: 'Small (1 Kişilik)', translations: { tr: 'Small (1 Kişilik)', en: 'Small (1 Person)', de: 'Klein (1 Person)', ru: 'Маленькая (1 человек)', fr: 'Petit (1 personne)', ar: 'صغير (شخص واحد)' }, priceDelta: 0 },
                            { id: 'o22', name: 'Medium (1-2 Kişilik)', translations: { tr: 'Medium (1-2 Kişilik)', en: 'Medium (1-2 People)', de: 'Mittel (1-2 Personen)', ru: 'Средняя (1-2 человека)', fr: 'Moyen (1-2 personnes)', ar: 'متوسط (1-2 أشخاص)' }, priceDelta: 60 },
                            { id: 'o23', name: 'Large (2-3 Kişilik)', translations: { tr: 'Large (2-3 Kişilik)', en: 'Large (2-3 People)', de: 'Groß (2-3 Personen)', ru: 'Большая (2-3 человека)', fr: 'Grand (2-3 personnes)', ar: 'كبير (2-3 أشخاص)' }, priceDelta: 120 },
                            { id: 'o24', name: 'XLarge (3-4 Kişilik)', translations: { tr: 'XLarge (3-4 Kişilik)', en: 'XLarge (3-4 People)', de: 'Extra Groß (3-4 Personen)', ru: 'Очень большая (3-4 человека)', fr: 'Très grand (3-4 personnes)', ar: 'كبير جداً (3-4 أشخاص)' }, priceDelta: 180 }
                        ]
                    }
                ]
            },
            {
                id: 'p7',
                category: 'pizzalar',
                price: 250,
                image: './pic/Pizzalar/ıspanak-tulum-yicem.jpg',
                translations: {
                    tr: { name: 'Ispanak Tulum Yicem', description: 'Ispanak Tulum Yicem Pizza' },
                    en: { name: 'Spinach Tulum Yicem', description: 'Spinach Tulum Yicem Pizza' },
                    de: { name: 'Spinat Tulum Yicem', description: 'Spinat Tulum Yicem Pizza' },
                    ru: { name: 'Йицем со шпинатом и тулумом', description: 'Пицца Йицем со шпинатом и тулумом' },
                    fr: { name: 'Yicem aux Épinards et Tulum', description: 'Pizza Yicem aux Épinards et Tulum' },
                    ar: { name: 'يجم بالسبانخ والتولوم', description: 'بيتزا يجم بالسبانخ والتولوم' }
                },
                ingredients: ['Pizza Sosu', 'Ispanak', 'Tulum Peyniri', 'Fesleğen'],
                extras: [
                    {
                        type: 'radio',
                        name: 'Boyut',
                        translations: { tr: 'Boyut', en: 'Size', de: 'Größe', ru: 'Размер', fr: 'Taille', ar: 'الحجم' },
                        options: [
                            { id: 'o25', name: 'Small (1 Kişilik)', translations: { tr: 'Small (1 Kişilik)', en: 'Small (1 Person)', de: 'Klein (1 Person)', ru: 'Маленькая (1 человек)', fr: 'Petit (1 personne)', ar: 'صغير (شخص واحد)' }, priceDelta: 0 },
                            { id: 'o26', name: 'Medium (1-2 Kişilik)', translations: { tr: 'Medium (1-2 Kişilik)', en: 'Medium (1-2 People)', de: 'Mittel (1-2 Personen)', ru: 'Средняя (1-2 человека)', fr: 'Moyen (1-2 personnes)', ar: 'متوسط (1-2 أشخاص)' }, priceDelta: 60 },
                            { id: 'o27', name: 'Large (2-3 Kişilik)', translations: { tr: 'Large (2-3 Kişilik)', en: 'Large (2-3 People)', de: 'Groß (2-3 Personen)', ru: 'Большая (2-3 человека)', fr: 'Grand (2-3 personnes)', ar: 'كبير (2-3 أشخاص)' }, priceDelta: 120 },
                            { id: 'o28', name: 'XLarge (3-4 Kişilik)', translations: { tr: 'XLarge (3-4 Kişilik)', en: 'XLarge (3-4 People)', de: 'Extra Groß (3-4 Personen)', ru: 'Очень большая (3-4 человека)', fr: 'Très grand (3-4 personnes)', ar: 'كبير جداً (3-4 أشخاص)' }, priceDelta: 180 }
                        ]
                    }
                ]
            },
            {
                id: 'p8',
                category: 'pizzalar',
                price: 190,
                image: './pic/Pizzalar/klasik-yicem.jpg',
                translations: {
                    tr: { name: 'Klasik Vejeteryan', description: 'Klasik Yicem Pizza' },
                    en: { name: 'Classic Yicem', description: 'Classic Yicem Pizza' },
                    de: { name: 'Klassischer Yicem', description: 'Klassischer Yicem Pizza' },
                    ru: { name: 'Классический Йицем', description: 'Классическая пицца Йицем' },
                    fr: { name: 'Yicem Classique', description: 'Pizza Yicem Classique' },
                    ar: { name: 'يجم كلاسيكي', description: 'بيتزا يجم كلاسيكي' }
                },
                ingredients: ['Pizza Sosu', 'Mozzarella', 'Fesleğen', 'Cherry Domates'],
                extras: [
                    {
                        type: 'radio',
                        name: 'Boyut',
                        translations: { tr: 'Boyut', en: 'Size', de: 'Größe', ru: 'Размер', fr: 'Taille', ar: 'الحجم' },
                        options: [
                            { id: 'o29', name: 'Small (1 Kişilik)', translations: { tr: 'Small (1 Kişilik)', en: 'Small (1 Person)', de: 'Klein (1 Person)', ru: 'Маленькая (1 человек)', fr: 'Petit (1 personne)', ar: 'صغير (شخص واحد)' }, priceDelta: 0 },
                            { id: 'o30', name: 'Medium (1-2 Kişilik)', translations: { tr: 'Medium (1-2 Kişilik)', en: 'Medium (1-2 People)', de: 'Mittel (1-2 Personen)', ru: 'Средняя (1-2 человека)', fr: 'Moyen (1-2 personnes)', ar: 'متوسط (1-2 أشخاص)' }, priceDelta: 60 },
                            { id: 'o31', name: 'Large (2-3 Kişilik)', translations: { tr: 'Large (2-3 Kişilik)', en: 'Large (2-3 People)', de: 'Groß (2-3 Personen)', ru: 'Большая (2-3 человека)', fr: 'Grand (2-3 personnes)', ar: 'كبير (2-3 أشخاص)' }, priceDelta: 120 },
                            { id: 'o32', name: 'XLarge (3-4 Kişilik)', translations: { tr: 'XLarge (3-4 Kişilik)', en: 'XLarge (3-4 People)', de: 'Extra Groß (3-4 Personen)', ru: 'Очень большая (3-4 человека)', fr: 'Très grand (3-4 personnes)', ar: 'كبير جداً (3-4 أشخاص)' }, priceDelta: 180 }
                        ]
                    }
                ]
            },
            {
                id: 'p9',
                category: 'pizzalar',
                price: 240,
                image: './pic/Pizzalar/sosisli-yicem.jpg',
                translations: {
                    tr: { name: 'Sosisli Yicem', description: 'Sosisli Yicem Pizza' },
                    en: { name: 'Sausage Yicem', description: 'Sausage Yicem Pizza' },
                    de: { name: 'Wurst Yicem', description: 'Wurst Yicem Pizza' },
                    ru: { name: 'Йицем с колбасой', description: 'Пицца Йицем с колбасой' },
                    fr: { name: 'Yicem aux Saucisses', description: 'Pizza Yicem aux Saucisses' },
                    ar: { name: 'يجم بالسجق', description: 'بيتزا يجم بالسجق' }
                },
                ingredients: ['Pizza Sosu', 'Sosis', 'Peynir', 'Mantar', 'Zeytin'],
                extras: [
                    {
                        type: 'radio',
                        name: 'Boyut',
                        translations: { tr: 'Boyut', en: 'Size', de: 'Größe', ru: 'Размер', fr: 'Taille', ar: 'الحجم' },
                        options: [
                            { id: 'o33', name: 'Small (1 Kişilik)', translations: { tr: 'Small (1 Kişilik)', en: 'Small (1 Person)', de: 'Klein (1 Person)', ru: 'Маленькая (1 человек)', fr: 'Petit (1 personne)', ar: 'صغير (شخص واحد)' }, priceDelta: 0 },
                            { id: 'o34', name: 'Medium (1-2 Kişilik)', translations: { tr: 'Medium (1-2 Kişilik)', en: 'Medium (1-2 People)', de: 'Mittel (1-2 Personen)', ru: 'Средняя (1-2 человека)', fr: 'Moyen (1-2 personnes)', ar: 'متوسط (1-2 أشخاص)' }, priceDelta: 60 },
                            { id: 'o35', name: 'Large (2-3 Kişilik)', translations: { tr: 'Large (2-3 Kişilik)', en: 'Large (2-3 People)', de: 'Groß (2-3 Personen)', ru: 'Большая (2-3 человека)', fr: 'Grand (2-3 personnes)', ar: 'كبير (2-3 أشخاص)' }, priceDelta: 120 },
                            { id: 'o36', name: 'XLarge (3-4 Kişilik)', translations: { tr: 'XLarge (3-4 Kişilik)', en: 'XLarge (3-4 People)', de: 'Extra Groß (3-4 Personen)', ru: 'Очень большая (3-4 человека)', fr: 'Très grand (3-4 personnes)', ar: 'كبير جداً (3-4 أشخاص)' }, priceDelta: 180 }
                        ]
                    }
                ]
            },
            {
                id: 'p10',
                category: 'pizzalar',
                price: 240,
                image: './pic/Pizzalar/sucuklu-yicem.jpg',
                translations: {
                    tr: { name: 'Sucuklu Yicem', description: 'Sucuklu Yicem Pizza' },
                    en: { name: 'Sausage Yicem', description: 'Sausage Yicem Pizza' },
                    de: { name: 'Wurst Yicem', description: 'Wurst Yicem Pizza' },
                    ru: { name: 'Йицем с суджуком', description: 'Пицца Йицем с суджуком' },
                    fr: { name: 'Yicem aux Saucisses', description: 'Pizza Yicem aux Saucisses' },
                    ar: { name: 'يجم بالسجق', description: 'بيتزا يجم بالسجق' }
                },
                ingredients: ['Pizza Sosu', 'Sucuk', 'Peynir', 'Mantar', 'Zeytin'],
                extras: [
                    {
                        type: 'radio',
                        name: 'Boyut',
                        translations: { tr: 'Boyut', en: 'Size', de: 'Größe', ru: 'Размер', fr: 'Taille', ar: 'الحجم' },
                        options: [
                            { id: 'o37', name: 'Small (1 Kişilik)', translations: { tr: 'Small (1 Kişilik)', en: 'Small (1 Person)', de: 'Klein (1 Person)', ru: 'Маленькая (1 человек)', fr: 'Petit (1 personne)', ar: 'صغير (شخص واحد)' }, priceDelta: 0 },
                            { id: 'o38', name: 'Medium (1-2 Kişilik)', translations: { tr: 'Medium (1-2 Kişilik)', en: 'Medium (1-2 People)', de: 'Mittel (1-2 Personen)', ru: 'Средняя (1-2 человека)', fr: 'Moyen (1-2 personnes)', ar: 'متوسط (1-2 أشخاص)' }, priceDelta: 60 },
                            { id: 'o39', name: 'Large (2-3 Kişilik)', translations: { tr: 'Large (2-3 Kişilik)', en: 'Large (2-3 People)', de: 'Groß (2-3 Personen)', ru: 'Большая (2-3 человека)', fr: 'Grand (2-3 personnes)', ar: 'كبير (2-3 أشخاص)' }, priceDelta: 120 },
                            { id: 'o40', name: 'XLarge (3-4 Kişilik)', translations: { tr: 'XLarge (3-4 Kişilik)', en: 'XLarge (3-4 People)', de: 'Extra Groß (3-4 Personen)', ru: 'Очень большая (3-4 человека)', fr: 'Très grand (3-4 personnes)', ar: 'كبير جداً (3-4 أشخاص)' }, priceDelta: 180 }
                        ]
                    }
                ]
            },
            {
                id: 'p11',
                category: 'pizzalar',
                price: 240,
                image: './pic/Pizzalar/tavuklu-yicem.jpg',
                translations: {
                    tr: { name: 'Tavuklu Yicem', description: 'Tavuklu Yicem Pizza' },
                    en: { name: 'Chicken Yicem', description: 'Chicken Yicem Pizza' },
                    de: { name: 'Hähnchen Yicem', description: 'Hähnchen Yicem Pizza' },
                    ru: { name: 'Йицем с курицей', description: 'Пицца Йицем с курицей' },
                    fr: { name: 'Yicem au Poulet', description: 'Pizza Yicem au Poulet' },
                    ar: { name: 'يجم بالدجاج', description: 'بيتزا يجم بالدجاج' }
                },
                ingredients: ['Pizza Sosu', 'Tavuk', 'Peynir', 'Mantar', 'Zeytin'],
                extras: [
                    {
                        type: 'radio',
                        name: 'Boyut',
                        translations: { tr: 'Boyut', en: 'Size', de: 'Größe', ru: 'Размер', fr: 'Taille', ar: 'الحجم' },
                        options: [
                            { id: 'o41', name: 'Small (1 Kişilik)', translations: { tr: 'Small (1 Kişilik)', en: 'Small (1 Person)', de: 'Klein (1 Person)', ru: 'Маленькая (1 человек)', fr: 'Petit (1 personne)', ar: 'صغير (شخص واحد)' }, priceDelta: 0 },
                            { id: 'o42', name: 'Medium (1-2 Kişilik)', translations: { tr: 'Medium (1-2 Kişilik)', en: 'Medium (1-2 People)', de: 'Mittel (1-2 Personen)', ru: 'Средняя (1-2 человека)', fr: 'Moyen (1-2 personnes)', ar: 'متوسط (1-2 أشخاص)' }, priceDelta: 60 },
                            { id: 'o43', name: 'Large (2-3 Kişilik)', translations: { tr: 'Large (2-3 Kişilik)', en: 'Large (2-3 People)', de: 'Groß (2-3 Personen)', ru: 'Большая (2-3 человека)', fr: 'Grand (2-3 personnes)', ar: 'كبير (2-3 أشخاص)' }, priceDelta: 120 },
                            { id: 'o44', name: 'XLarge (3-4 Kişilik)', translations: { tr: 'XLarge (3-4 Kişilik)', en: 'XLarge (3-4 People)', de: 'Extra Groß (3-4 Personen)', ru: 'Очень большая (3-4 человека)', fr: 'Très grand (3-4 personnes)', ar: 'كبير جداً (3-4 أشخاص)' }, priceDelta: 180 }
                        ]
                    }
                ]
            },
            {
                id: 'p12',
                category: 'pizzalar',
                price: 260,
                image: './pic/Pizzalar/tonno-yicem.jpg',
                translations: {
                    tr: { name: 'Tonno Yicem', description: 'Tonno Yicem Pizza' },
                    en: { name: 'Tuna Yicem', description: 'Tuna Yicem Pizza' },
                    de: { name: 'Thunfisch Yicem', description: 'Thunfisch Yicem Pizza' },
                    ru: { name: 'Йицем с тунцом', description: 'Пицца Йицем с тунцом' },
                    fr: { name: 'Yicem au Thon', description: 'Pizza Yicem au Thon' },
                    ar: { name: 'يجم بالتونة', description: 'بيتزا يجم بالتونة' }
                },
                ingredients: ['Pizza Sosu', 'Ton Balığı', 'Peynir', 'Soğan', 'Zeytin'],
                extras: [
                    {
                        type: 'radio',
                        name: 'Boyut',
                        translations: { tr: 'Boyut', en: 'Size', de: 'Größe', ru: 'Размер', fr: 'Taille', ar: 'الحجم' },
                        options: [
                            { id: 'o45', name: 'Small (1 Kişilik)', translations: { tr: 'Small (1 Kişilik)', en: 'Small (1 Person)', de: 'Klein (1 Person)', ru: 'Маленькая (1 человек)', fr: 'Petit (1 personne)', ar: 'صغير (شخص واحد)' }, priceDelta: 0 },
                            { id: 'o46', name: 'Medium (1-2 Kişilik)', translations: { tr: 'Medium (1-2 Kişilik)', en: 'Medium (1-2 People)', de: 'Mittel (1-2 Personen)', ru: 'Средняя (1-2 человека)', fr: 'Moyen (1-2 personnes)', ar: 'متوسط (1-2 أشخاص)' }, priceDelta: 60 },
                            { id: 'o47', name: 'Large (2-3 Kişilik)', translations: { tr: 'Large (2-3 Kişilik)', en: 'Large (2-3 People)', de: 'Groß (2-3 Personen)', ru: 'Большая (2-3 человека)', fr: 'Grand (2-3 personnes)', ar: 'كبير (2-3 أشخاص)' }, priceDelta: 120 },
                            { id: 'o48', name: 'XLarge (3-4 Kişilik)', translations: { tr: 'XLarge (3-4 Kişilik)', en: 'XLarge (3-4 People)', de: 'Extra Groß (3-4 Personen)', ru: 'Очень большая (3-4 человека)', fr: 'Très grand (3-4 personnes)', ar: 'كبير جداً (3-4 أشخاص)' }, priceDelta: 180 }
                        ]
                    }
                ]
            },
            {
                id: 'yicem-donerli',
                category: 'pizzalar',
                price: 300,
                image: './pic/Pizzalar/donerli-yicem.jpg',
                translations: {
                    tr: { name: 'Dönerli Yicem', description: 'Yicem Dönerli Pizza' },
                    en: { name: 'Donerli Yicem', description: 'Yicem Dönerli Pizza' },
                    de: { name: 'Donerli Yicem', description: 'Yicem Dönerli Pizza' },
                    ru: { name: 'Дёнерли Йицем', description: 'Пицца Йицем Дёнерли' },
                    fr: { name: 'Yicem au Döner', description: 'Pizza Yicem au Döner' },
                    ar: { name: 'يجم دونرلي', description: 'بيتزا يجم دونرلي' }
                },
                ingredients: ['Döner', 'Peynir', 'Domates', 'Soğan'],
                extras: [
                    {
                        type: 'radio',
                        name: 'Boyut',
                        translations: { tr: 'Boyut', en: 'Size', de: 'Größe', ru: 'Размер', fr: 'Taille', ar: 'الحجم' },
                        options: [
                            { id: 'o49', name: 'Small (1 Kişilik)', translations: { tr: 'Small (1 Kişilik)', en: 'Small (1 Person)', de: 'Klein (1 Person)', ru: 'Маленькая (1 человек)', fr: 'Petit (1 personne)', ar: 'صغير (شخص واحد)' }, priceDelta: 0 },
                            { id: 'o50', name: 'Medium (1-2 Kişilik)', translations: { tr: 'Medium (1-2 Kişilik)', en: 'Medium (1-2 People)', de: 'Mittel (1-2 Personen)', ru: 'Средняя (1-2 человека)', fr: 'Moyen (1-2 personnes)', ar: 'متوسط (1-2 أشخاص)' }, priceDelta: 60 },
                            { id: 'o51', name: 'Large (2-3 Kişilik)', translations: { tr: 'Large (2-3 Kişilik)', en: 'Large (2-3 People)', de: 'Groß (2-3 Personen)', ru: 'Большая (2-3 человека)', fr: 'Grand (2-3 personnes)', ar: 'كبير (2-3 أشخاص)' }, priceDelta: 120 },
                            { id: 'o52', name: 'XLarge (3-4 Kişilik)', translations: { tr: 'XLarge (3-4 Kişilik)', en: 'XLarge (3-4 People)', de: 'Extra Groß (3-4 Personen)', ru: 'Очень большая (3-4 человека)', fr: 'Très grand (3-4 personnes)', ar: 'كبير جداً (3-4 أشخاص)' }, priceDelta: 180 }
                        ]
                    }
                ]
            },
            // Tavuk Döner kategorisi - JSON'dan gömülü veriler
            {
                id: 'td1',
                category: 'tavuk-doner',
                price: 250,
                image: './pic/Tavuk-Doner/tavuk-doner-beyti.jpg',
                translations: {
                    tr: { name: 'Tavuk Döner Beyti', description: 'Tavuk Döner Beyti' },
                    en: { name: 'Chicken Döner Beyti', description: 'Chicken Döner Beyti' },
                    de: { name: 'Hähnchen Döner Beyti', description: 'Hähnchen Döner Beyti' },
                    ru: { name: 'Куриный дёнер бейти', description: 'Куриный дёнер бейти' },
                    fr: { name: 'Döner de Poulet Beyti', description: 'Döner de Poulet Beyti' },
                    ar: { name: 'دونر دجاج بييتي', description: 'دونر دجاج بييتي' }
                },
                
                extras: []
            },
            {
                id: 'td2',
                category: 'tavuk-doner',
                price: 180,
                image: './pic/Tavuk-Doner/tavuk-doner-porsiyon.jpg',
                translations: {
                    tr: { name: 'Tavuk Döner Porsiyon (100gr)', description: 'Tavuk Döner Porsiyon' },
                    en: { name: 'Chicken Döner Portion', description: 'Chicken Döner Portion' },
                    de: { name: 'Hähnchen Döner Portion', description: 'Hähnchen Döner Portion' },
                    ru: { name: 'Порция куриного дёнера', description: 'Порция куриного дёнера' },
                    fr: { name: 'Portion Döner de Poulet', description: 'Portion Döner de Poulet' },
                    ar: { name: 'حصة دونر دجاج', description: 'حصة دونر دجاج' }
                },
                ingredients: ['Tavuk Döner', 'Pilav', 'Salata', 'Soğan'],
                extras: []
            },
            {
                id: 'td3',
                category: 'tavuk-doner',
                price: 230,
                image: './pic/Tavuk-Doner/pilav-ustu-tavuk-doner.jpg',
                translations: {
                    tr: { name: 'Pilav Üstü Tavuk Döner', description: 'Pilav Üstü Tavuk Döner' },
                    en: { name: 'Chicken Döner on Rice', description: 'Chicken Döner on Rice' },
                    de: { name: 'Hähnchen Döner auf Reis', description: 'Hähnchen Döner auf Reis' },
                    ru: { name: 'Куриный дёнер на рисе', description: 'Куриный дёнер на рисе' },
                    fr: { name: 'Döner de Poulet sur Riz', description: 'Döner de Poulet sur Riz' },
                    ar: { name: 'دونر دجاج على الأرز', description: 'دونر دجاج على الأرز' }
                },
                ingredients: ['Tavuk Döner', 'Pilav', 'Salata', 'Soğan'],
                extras: []
            },
            {
                id: 'td4',
                category: 'tavuk-doner',
                price: 120,
                image: './pic/Tavuk-Doner/3lu-tavuk-doner.jpg',
                translations: {
                    tr: { name: '3 Adet Tavuk Döner', description: '3 Adet Tavuk Döner' },
                    en: { name: '3 Pieces Chicken Döner', description: '3 Pieces Chicken Döner' },
                    de: { name: '3 Stück Hähnchen Döner', description: '3 Stück Hähnchen Döner' },
                    ru: { name: '3 кусочка куриного дёнера', description: '3 кусочка куриного дёнера' },
                    fr: { name: '3 Morceaux Döner de Poulet', description: '3 Morceaux Döner de Poulet' },
                    ar: { name: '3 قطع دونر دجاج', description: '3 قطع دونر دجاج' }
                },
                ingredients: {
                    tr: ['Tavuk Döner', 'Marul', 'Domates'],
                    en: ['Chicken Doner', 'Lettuce', 'Tomato'],
                    de: ['Hähnchen Döner', 'Salat', 'Tomate'],
                    ru: ['Куриный донер', 'Листовой салат', 'Помидор'],
                    fr: ['Döner au poulet', 'Laitue', 'Tomate'],
                    ar: ['دونر دجاج', 'خص', 'طماطم']
                },
                extras: []
            },
            {
                id: 'td5',
                category: 'tavuk-doner',
                price: 180,
                image: './pic/Tavuk-Doner/5lı-tavuk-doner.jpg',
                translations: {
                    tr: { name: '5 Adet Tavuk Döner', description: '5 Adet Tavuk Döner' },
                    en: { name: '5 Pieces Chicken Döner', description: '5 Pieces Chicken Döner' },
                    de: { name: '5 Stück Hähnchen Döner', description: '5 Stück Hähnchen Döner' },
                    ru: { name: '5 кусочков куриного дёнера', description: '5 кусочков куриного дёнера' },
                    fr: { name: '5 Morceaux Döner de Poulet', description: '5 Morceaux Döner de Poulet' },
                    ar: { name: '5 قطع دونر دجاج', description: '5 قطع دونر دجاج' }
                },
                ingredients: {
                    tr: ['Tavuk Döner', 'Marul', 'Domates'],
                    en: ['Chicken Doner', 'Lettuce', 'Tomato'],
                    de: ['Hähnchen Döner', 'Salat', 'Tomate'],
                    ru: ['Куриный донер', 'Листовой салат', 'Помидор'],
                    fr: ['Döner au poulet', 'Laitue', 'Tomate'],
                    ar: ['دونر دجاج', 'خص', 'طماطم']
                },
                extras: []
            },
            {
                id: 'td6',
                category: 'tavuk-doner',
                price: 220,
                image: './pic/Tavuk-Doner/tavuk-iskender.jpg',
                translations: {
                    tr: { name: 'Tavuk İskender', description: 'Tavuk İskender' },
                    en: { name: 'Chicken İskender', description: 'Chicken İskender' },
                    de: { name: 'Hähnchen İskender', description: 'Hähnchen İskender' },
                    ru: { name: 'Куриный Искендер', description: 'Куриный Искендер' },
                    fr: { name: 'İskender au Poulet', description: 'İskender au Poulet' },
                    ar: { name: 'إسكندر دجاج', description: 'إسكندر دجاج' }
                },
                ingredients: ['Tavuk Döner', 'Pilav', 'Salata', 'Soğan', 'Domates', 'Yoğurt'],
                extras: []
            },
            {
                id: 'tavuk-doner-beyti',
                category: 'tavuk-doner',
                price: 160,
                image: './images/tavuk-doner-beyti.jpg',
                translations: {
                    tr: { name: 'Tavuk Döner Beyti', description: 'Tavuk Döner Beyti' },
                    en: { name: 'Chicken Döner Beyti', description: 'Chicken Döner Beyti' },
                    de: { name: 'Hähnchen Döner Beyti', description: 'Hähnchen Döner Beyti' },
                    ru: { name: 'Куриный дёнер бейти', description: 'Куриный дёнер бейти' },
                    fr: { name: 'Döner de Poulet Beyti', description: 'Döner de Poulet Beyti' },
                    ar: { name: 'دونر دجاج بييتي', description: 'دونر دجاج بييتي' }
                },
                ingredients: ['Tavuk Döner', 'Lavash', 'Soğan', 'Domates'],
                extras: []
            },
            // Et Döner kategorisi - JSON'dan gömülü veriler
            {
                id: 'ed1',
                category: 'et-doner',
                price: 200,
                image: this.getAutoImagePath('ed1', 'Et Döner Porsiyon', 'Et-Doner'),
                translations: {
                    tr: { name: 'Et Döner Porsiyon', description: 'Et Döner Porsiyon' },
                    en: { name: 'Beef Döner Portion', description: 'Beef Döner Portion' },
                    de: { name: 'Rind Döner Portion', description: 'Rind Döner Portion' },
                    ru: { name: 'Порция говяжьего дёнера', description: 'Порция говяжьего дёнера' },
                    fr: { name: 'Portion Döner de Bœuf', description: 'Portion Döner de Bœuf' },
                    ar: { name: 'حصة دونر لحم', description: 'حصة دونر لحم' }
                },
                ingredients: ['Et Döner', 'Pilav', 'Salata', 'Soğan'],
                extras: []
            },
            {
                id: 'ed2',
                category: 'et-doner',
                price: 220,
                image: this.getAutoImagePath('ed2', 'Pilavüstü Et Döner', 'Et-Doner'),
                translations: {
                    tr: { name: 'Pilavüstü Et Döner', description: 'Pilavüstü Et Döner' },
                    en: { name: 'Beef Döner on Rice', description: 'Beef Döner on Rice' },
                    de: { name: 'Rind Döner auf Reis', description: 'Rind Döner auf Reis' },
                    ru: { name: 'Говяжий дёнер на рисе', description: 'Говяжий дёнер на рисе' },
                    fr: { name: 'Döner de Bœuf sur Riz', description: 'Döner de Bœuf sur Riz' },
                    ar: { name: 'دونر لحم على الأرز', description: 'دونر لحم على الأرز' }
                },
                ingredients: ['Et Döner', 'Pilav', 'Salata', 'Soğan'],
                extras: []
            },
            {
                id: 'ed3',
                category: 'et-doner',
                price: 150,
                image: this.getAutoImagePath('ed3', '3 Adet Et Döner', 'Et-Doner'),
                translations: {
                    tr: { name: '3 Adet Et Döner', description: '3 Adet Et Döner' },
                    en: { name: '3 Pieces Beef Döner', description: '3 Pieces Beef Döner' },
                    de: { name: '3 Stück Rind Döner', description: '3 Stück Rind Döner' },
                    ru: { name: '3 кусочка говяжьего дёнера', description: '3 кусочка говяжьего дёнера' },
                    fr: { name: '3 Morceaux Döner de Bœuf', description: '3 Morceaux Döner de Bœuf' },
                    ar: { name: '3 قطع دونر لحم', description: '3 قطع دونر لحم' }
                },
                ingredients: ['Et Döner', 'Lavash', 'Soğan', 'Domates'],
                extras: []
            },
            {
                id: 'ed4',
                category: 'et-doner',
                price: 220,
                image: this.getAutoImagePath('ed4', '5 Adet Et Döner', 'Et-Doner'),
                translations: {
                    tr: { name: '5 Adet Et Döner', description: '5 Adet Et Döner' },
                    en: { name: '5 Pieces Beef Döner', description: '5 Pieces Beef Döner' },
                    de: { name: '5 Stück Rind Döner', description: '5 Stück Rind Döner' },
                    ru: { name: '5 кусочков говяжьего дёнера', description: '5 кусочков говяжьего дёнера' },
                    fr: { name: '5 Morceaux Döner de Bœuf', description: '5 Morceaux Döner de Bœuf' },
                    ar: { name: '5 قطع دونر لحم', description: '5 قطع دونر لحم' }
                },
                ingredients: ['Et Döner', 'Lavash', 'Soğan', 'Domates'],
                extras: []
            },
            {
                id: 'ed5',
                category: 'et-doner',
                price: 240,
                image: this.getAutoImagePath('ed5', 'Et İskender', 'Et-Doner'),
                translations: {
                    tr: { name: 'Et İskender', description: 'Et İskender' },
                    en: { name: 'Beef İskender', description: 'Beef İskender' },
                    de: { name: 'Rind İskender', description: 'Rind İskender' },
                    ru: { name: 'Говяжий Искендер', description: 'Говяжий Искендер' },
                    fr: { name: 'İskender au Bœuf', description: 'İskender au Bœuf' },
                    ar: { name: 'إسكندر لحم', description: 'إسكندر لحم' }
                },
                ingredients: ['Et Döner', 'Pilav', 'Salata', 'Soğan', 'Domates', 'Yoğurt'],
                extras: []
            },
            {
                id: 'ed6',
                category: 'et-doner',
                price: 190,
                image: this.getAutoImagePath('ed6', 'Kaşarlı Et Döner', 'Et-Doner'),
                translations: {
                    tr: { name: 'Kaşarlı Et Döner', description: 'Kaşarlı Et Döner' },
                    en: { name: 'Cheesy Beef Döner', description: 'Cheesy Beef Döner' },
                    de: { name: 'Käse-Rind Döner', description: 'Käse-Rind Döner' },
                    ru: { name: 'Говяжий дёнер с сыром', description: 'Говяжий дёнер с сыром' },
                    fr: { name: 'Döner de Bœuf au Fromage', description: 'Döner de Bœuf au Fromage' },
                    ar: { name: 'دونر لحم بالجبن', description: 'دونر لحم بالجبن' }
                },
                ingredients: ['Et Döner', 'Kaşar Peyniri', 'Lavash', 'Soğan', 'Domates'],
                extras: []
            },
            {
                id: 'ed7',
                category: 'et-doner',
                price: 210,
                image: this.getAutoImagePath('ed7', 'Soslu Döner', 'Et-Doner'),
                translations: {
                    tr: { name: 'Soslu Döner', description: 'Soslu Döner' },
                    en: { name: 'Saucy Döner', description: 'Saucy Döner' },
                    de: { name: 'Saucen-Döner', description: 'Saucen-Döner' },
                    ru: { name: 'Дёнер с соусом', description: 'Дёнер с соусом' },
                    fr: { name: 'Döner à la Sauce', description: 'Döner à la Sauce' },
                    ar: { name: 'دونر بالصلصة', description: 'دونر بالصلصة' }
                },
                ingredients: ['Et Döner', 'Özel Sos', 'Lavash', 'Soğan', 'Domates'],
                extras: []
            },
            {
                id: 'ed8',
                category: 'et-doner',
                price: 180,
                image: this.getAutoImagePath('ed8', 'Ayvalık Et Döner', 'Et-Doner'),
                translations: {
                    tr: { name: 'Ayvalık Et Döner', description: 'Ayvalık Et Döner' },
                    en: { name: 'Ayvalık Beef Döner', description: 'Ayvalık Beef Döner' },
                    de: { name: 'Ayvalık Rind Döner', description: 'Ayvalık Rind Döner' },
                    ru: { name: 'Айвалык говяжий дёнер', description: 'Айвалык говяжий дёнер' },
                    fr: { name: 'Döner de Bœuf Ayvalık', description: 'Döner de Bœuf Ayvalık' },
                    ar: { name: 'دونر لحم أيفاليك', description: 'دونر لحم أيفاليك' }
                },
                ingredients: ['Et Döner', 'Lavash', 'Soğan', 'Domates', 'Özel Baharat'],
                extras: []
            },
            {
                id: 'tavuk-doner-porsiyon',
                category: 'tavuk-doner',
                price: 180,
                image: './images/tavuk-doner-porsiyon.jpg',
                translations: {
                    tr: { name: 'Tavuk Döner Porsiyon', description: 'Tavuk Döner Porsiyon' },
                    en: { name: 'Chicken Döner Portion', description: 'Chicken Döner Portion' },
                    de: { name: 'Hähnchen Döner Portion', description: 'Hähnchen Döner Portion' },
                    ru: { name: 'Порция куриного дёнера', description: 'Порция куриного дёнера' },
                    fr: { name: 'Portion Döner de Poulet', description: 'Portion Döner de Poulet' },
                    ar: { name: 'حصة دونر دجاج', description: 'حصة دونر دجاج' }
                },
                ingredients: ['Tavuk Döner', 'Pilav', 'Salata', 'Soğan'],
                extras: []
            },
            {
                id: 'pilavustu-tavuk-doner',
                category: 'tavuk-doner',
                price: 200,
                image: './images/pilav-ustu-tavuk-doner.jpg',
                translations: {
                    tr: { name: 'Pilavüstü Tavuk Döner', description: 'Pilavüstü Tavuk Döner' },
                    en: { name: 'Chicken Döner on Rice', description: 'Chicken Döner on Rice' },
                    de: { name: 'Hähnchen Döner auf Reis', description: 'Hähnchen Döner auf Reis' },
                    ru: { name: 'Куриный дёнер на рисе', description: 'Куриный дёнер на рисе' },
                    fr: { name: 'Döner de Poulet sur Riz', description: 'Döner de Poulet sur Riz' },
                    ar: { name: 'دونر دجاج على الأرز', description: 'دونر دجاج على الأرز' }
                },
                ingredients: ['Tavuk Döner', 'Pilav', 'Salata', 'Soğan'],
                extras: []
            },
            {
                id: '3-adet-tavuk-doner',
                category: 'tavuk-doner',
                price: 120,
                image: './images/3lu-tavuk-doner.jpg',
                translations: {
                    tr: { name: '3 Adet Tavuk Döner', description: '3 Adet Tavuk Döner' },
                    en: { name: '3 Pieces Chicken Döner', description: '3 Pieces Chicken Döner' },
                    de: { name: '3 Stück Hähnchen Döner', description: '3 Stück Hähnchen Döner' },
                    ru: { name: '3 кусочка куриного дёнера', description: '3 кусочка куриного дёнера' },
                    fr: { name: '3 Morceaux Döner de Poulet', description: '3 Morceaux Döner de Poulet' },
                    ar: { name: '3 قطع دونر دجاج', description: '3 قطع دونر دجاج' }
                },
                ingredients: ['Tavuk Döner', 'Lavash', 'Soğan', 'Domates'],
                extras: []
            },
            {
                id: '5-adet-tavuk-doner',
                category: 'tavuk-doner',
                price: 180,
                image: './images/5lı-tavuk-doner.jpg',
                translations: {
                    tr: { name: '5 Adet Tavuk Döner', description: '5 Adet Tavuk Döner' },
                    en: { name: '5 Pieces Chicken Döner', description: '5 Pieces Chicken Döner' },
                    de: { name: '5 Stück Hähnchen Döner', description: '5 Stück Hähnchen Döner' },
                    ru: { name: '5 кусочков куриного дёнера', description: '5 кусочков куриного дёнера' },
                    fr: { name: '5 Morceaux Döner de Poulet', description: '5 Morceaux Döner de Poulet' },
                    ar: { name: '5 قطع دونر دجاج', description: '5 قطع دونر دجاج' }
                },
                ingredients: ['Tavuk Döner', 'Lavash', 'Soğan', 'Domates'],
                extras: []
            },
            // Hamburger kategorisi - JSON'dan gömülü veriler
            {
                id: 'h1',
                category: 'hamburger',
                price: 180,
                image: this.getAutoImagePath('h1', 'Hamburger', 'Hamburger'),
                translations: {
                    tr: { name: 'Hamburger', description: 'Klasik Hamburger' },
                    en: { name: 'Hamburger', description: 'Classic Hamburger' },
                    de: { name: 'Hamburger', description: 'Klassischer Hamburger' },
                    ru: { name: 'Гамбургер', description: 'Классический гамбургер' },
                    fr: { name: 'Hamburger', description: 'Hamburger Classique' },
                    ar: { name: 'همبرغر', description: 'همبرغر كلاسيكي' }
                },
                ingredients: ['Dana Köfte', 'Hamburger Ekmeği', 'Marul', 'Domates', 'Soğan'],
                extras: []
            },
            {
                id: 'h2',
                category: 'hamburger',
                price: 200,
                image: this.getAutoImagePath('h2', 'Cheeseburger', 'Hamburger'),
                translations: {
                    tr: { name: 'Cheeseburger', description: 'Peynirli Hamburger' },
                    en: { name: 'Cheeseburger', description: 'Cheese Hamburger' },
                    de: { name: 'Cheeseburger', description: 'Käse-Hamburger' },
                    ru: { name: 'Чизбургер', description: 'Гамбургер с сыром' },
                    fr: { name: 'Cheeseburger', description: 'Hamburger au Fromage' },
                    ar: { name: 'تشيزبرغر', description: 'همبرغر بالجبن' }
                },
                ingredients: ['Dana Köfte', 'Kaşar Peyniri', 'Hamburger Ekmeği', 'Marul', 'Domates'],
                extras: []
            },
            {
                id: 'h3',
                category: 'hamburger',
                price: 160,
                image: this.getAutoImagePath('h3', 'Tavuk Burger', 'Hamburger'),
                translations: {
                    tr: { name: 'Tavuk Burger', description: 'Tavuk Burger' },
                    en: { name: 'Chicken Burger', description: 'Chicken Burger' },
                    de: { name: 'Hähnchen Burger', description: 'Hähnchen Burger' },
                    ru: { name: 'Куриный бургер', description: 'Куриный бургер' },
                    fr: { name: 'Burger au Poulet', description: 'Burger au Poulet' },
                    ar: { name: 'برجر دجاج', description: 'برجر دجاج' }
                },
                ingredients: ['Tavuk Köfte', 'Hamburger Ekmeği', 'Marul', 'Domates'],
                extras: []
            },
            {
                id: 'tavuk-burger',
                category: 'hamburger',
                price: 160,
                image: './images/tavukburger.jpg',
                translations: {
                    tr: { name: 'Tavuk Burger', description: 'Tavuk Burger' },
                    en: { name: 'Chicken Burger', description: 'Chicken Burger' },
                    de: { name: 'Hähnchen Burger', description: 'Hähnchen Burger' },
                    ru: { name: 'Куриный бургер', description: 'Куриный бургер' },
                    fr: { name: 'Burger au Poulet', description: 'Burger au Poulet' },
                    ar: { name: 'برجر دجاج', description: 'برجر دجاج' }
                },
                ingredients: ['Tavuk Köfte', 'Hamburger Ekmeği', 'Marul', 'Domates'],
                extras: []
            },
            // Salata kategorisi - JSON'dan gömülü veriler
            {
                id: 's1',
                category: 'salata',
                price: 80,
                image: this.getAutoImagePath('s1', 'Bahar Salata', 'Salata'),
                translations: {
                    tr: { name: 'Bahar Salata', description: 'Bahar Salata' },
                    en: { name: 'Spring Salad', description: 'Spring Salad' },
                    de: { name: 'Frühlingssalat', description: 'Frühlingssalat' },
                    ru: { name: 'Весенний салат', description: 'Весенний салат' },
                    fr: { name: 'Salade de Printemps', description: 'Salade de Printemps' },
                    ar: { name: 'سلطة الربيع', description: 'سلطة الربيع' }
                },
                ingredients: ['Marul', 'Domates', 'Salatalık', 'Soğan', 'Zeytin'],
                extras: []
            },
            {
                id: 's2',
                category: 'salata',
                price: 120,
                image: this.getAutoImagePath('s2', 'Çıtır Tavuk Salata', 'Salata'),
                translations: {
                    tr: { name: 'Çıtır Tavuk Salata', description: 'Çıtır Tavuk Salata' },
                    en: { name: 'Crispy Chicken Salad', description: 'Crispy Chicken Salad' },
                    de: { name: 'Knuspriger Hähnchensalat', description: 'Knuspriger Hähnchensalat' },
                    ru: { name: 'Салат с хрустящей курицей', description: 'Салат с хрустящей курицей' },
                    fr: { name: 'Salade de Poulet Croustillant', description: 'Salade de Poulet Croustillant' },
                    ar: { name: 'سلطة دجاج مقرمش', description: 'سلطة دجاج مقرمش' }
                },
                ingredients: ['Tavuk', 'Marul', 'Domates', 'Salatalık', 'Soğan'],
                extras: []
            },
            {
                id: 's3',
                category: 'salata',
                price: 100,
                image: this.getAutoImagePath('s3', 'Diyet Tavuk Salata', 'Salata'),
                translations: {
                    tr: { name: 'Diyet Tavuk Salata', description: 'Diyet Tavuk Salata' },
                    en: { name: 'Diet Chicken Salad', description: 'Diet Chicken Salad' },
                    de: { name: 'Diät-Hähnchensalat', description: 'Diät-Hähnchensalat' },
                    ru: { name: 'Диетический салат с курицей', description: 'Диетический салат с курицей' },
                    fr: { name: 'Salade de Poulet Diététique', description: 'Salade de Poulet Diététique' },
                    ar: { name: 'سلطة دجاج دايت', description: 'سلطة دجاج دايت' }
                },
                ingredients: ['Tavuk', 'Marul', 'Domates', 'Salatalık', 'Soğan'],
                extras: []
            },
            {
                id: 's4',
                category: 'salata',
                price: 90,
                image: this.getAutoImagePath('s4', 'Hellim Salata', 'Salata'),
                translations: {
                    tr: { name: 'Hellim Salata', description: 'Hellim Salata' },
                    en: { name: 'Halloumi Salad', description: 'Halloumi Salad' },
                    de: { name: 'Halloumi-Salat', description: 'Halloumi-Salat' },
                    ru: { name: 'Салат с халуми', description: 'Салат с халуми' },
                    fr: { name: 'Salade de Halloumi', description: 'Salade de Halloumi' },
                    ar: { name: 'سلطة حلوم', description: 'سلطة حلوم' }
                },
                ingredients: ['Hellim Peyniri', 'Marul', 'Domates', 'Salatalık', 'Soğan'],
                extras: []
            },
            {
                id: 's5',
                category: 'salata',
                price: 110,
                image: this.getAutoImagePath('s5', 'Sezar', 'Salata'),
                translations: {
                    tr: { name: 'Sezar', description: 'Sezar Salata' },
                    en: { name: 'Caesar', description: 'Caesar Salad' },
                    de: { name: 'Caesar', description: 'Caesar-Salat' },
                    ru: { name: 'Цезарь', description: 'Салат Цезарь' },
                    fr: { name: 'César', description: 'Salade César' },
                    ar: { name: 'قيصر', description: 'سلطة قيصر' }
                },
                ingredients: ['Marul', 'Parmesan Peyniri', 'Kruton', 'Sezar Sosu'],
                extras: []
            },
            {
                id: 's6',
                category: 'salata',
                price: 130,
                image: this.getAutoImagePath('s6', 'Tonno Salata', 'Salata'),
                translations: {
                    tr: { name: 'Tonno Salata', description: 'Tonno Salata' },
                    en: { name: 'Tuna Salad', description: 'Tuna Salad' },
                    de: { name: 'Thunfischsalat', description: 'Thunfischsalat' },
                    ru: { name: 'Салат с тунцом', description: 'Салат с тунцом' },
                    fr: { name: 'Salade de Thon', description: 'Salade de Thon' },
                    ar: { name: 'سلطة تونة', description: 'سلطة تونة' }
                },
                ingredients: ['Ton Balığı', 'Marul', 'Domates', 'Salatalık', 'Soğan'],
                extras: []
            },
            {
                id: 'elma-dilim-patates',
                category: 'aperatifler',
                price: 40,
                image: './images/elmadilim.jpg',
                translations: {
                    tr: { name: 'Elma Dilim Patates', description: 'Elma Dilim Patates' },
                    en: { name: 'Apple Slice Potatoes', description: 'Apple Slice Potatoes' },
                    de: { name: 'Apfelscheiben Kartoffeln', description: 'Apfelscheiben Kartoffeln' },
                    ru: { name: 'Картофель ломтиками', description: 'Картофель ломтиками' },
                    fr: { name: 'Pommes de Terre en Tranches', description: 'Pommes de Terre en Tranches' },
                    ar: { name: 'بطاطس شرائح', description: 'بطاطس شرائح' }
                },
                ingredients: ['Patates', 'Tuz', 'Yağ'],
                extras: []
            },
            // Ayvalık Tostu kategorisi - JSON'dan gömülü veriler
            {
                id: 't1',
                category: 'ayvalik-tostu',
                price: 130,
                image: './pic/Ayvalik-Tostu/sanayi-tostu.jpg',
                translations: {
                    tr: { name: 'Yicem Sanayi Tostu', description: 'Sanayi Tostu' },
                    en: { name: 'Industrial Toast', description: 'Industrial Toast' },
                    de: { name: 'Industrieller Toast', description: 'Industrieller Toast' },
                    ru: { name: 'Промышленный тост', description: 'Промышленный тост' },
                    fr: { name: 'Toast Industriel', description: 'Toast Industriel' },
                    ar: { name: 'توست صناعي', description: 'توست صناعي' }
                },
                ingredients: ['Taş Fırın Ekmeği', 'Sucuk', 'Kaşar', 'Salça'],
                extras: [{
                    type: 'radio',
                    name: 'Servis',
                    translations: { tr: 'Servis', en: 'Serving', de: 'Servieren', ru: 'Подача', fr: 'Service', ar: 'تقديم' },
                    options: [
                        { id: 't1_s1', name: 'Tek', translations: { tr: 'Tek', en: 'Single', de: 'Einzeln', ru: 'Одиночный', fr: 'Seul', ar: 'فرادى' }, priceDelta: 0 },
                        { id: 't1_s2', name: 'Menü (Cips + İçecek)', translations: { tr: 'Menü (Cips + İçecek)', en: 'Menu (Chips + Drink)', de: 'Menü (Chips + Getränk)', ru: 'Меню (Чипсы + Напиток)', fr: 'Menu (Chips + Boisson)', ar: 'قائمة (شيبس + مشروب)' }, priceDelta: 80 }
                    ]
                }]
            },
            {
                id: 't2',
                category: 'ayvalik-tostu',
                price: 170,
                image: './pic/Ayvalik-Tostu/yicem-karisik.jpg',
                translations: {
                    tr: { name: 'Yicem Karışık', description: 'Yicem Karışık Tost' },
                    en: { name: 'Yicem Mixed', description: 'Yicem Mixed Toast' },
                    de: { name: 'Yicem Gemischt', description: 'Yicem Gemischter Toast' },
                    ru: { name: 'Йицем Смешанный', description: 'Йицем Смешанный тост' },
                    fr: { name: 'Yicem Mélangé', description: 'Toast Yicem Mélangé' },
                    ar: { name: 'يجم مختلط', description: 'توست يجم مختلط' }
                },
                ingredients: ['Kaşar', 'Sucuk', 'Salam', 'Sosis', 'Turşu', 'Domates', 'Rus Salatası', 'Ketçap', 'Mayonez'],
                extras: [{
                    type: 'radio',
                    name: 'Servis',
                    translations: { tr: 'Servis', en: 'Serving', de: 'Servieren', ru: 'Подача', fr: 'Service', ar: 'تقديم' },
                    options: [
                        { id: 't2_s1', name: 'Tek', translations: { tr: 'Tek', en: 'Single', de: 'Einzeln', ru: 'Одиночный', fr: 'Seul', ar: 'فرادى' }, priceDelta: 0 },
                        { id: 't2_s2', name: 'Menü (Cips + İçecek)', translations: { tr: 'Menü (Cips + İçecek)', en: 'Menu (Chips + Drink)', de: 'Menü (Chips + Getränk)', ru: 'Меню (Чипсы + Напиток)', fr: 'Menu (Chips + Boisson)', ar: 'قائمة (شيبس + مشروب)' }, priceDelta: 80 }
                    ]
                }]
            },
            {
                id: 't3',
                category: 'ayvalik-tostu',
                price: 130,
                image: './pic/Ayvalik-Tostu/yicem-sucuklu.jpg',
                translations: {
                    tr: { name: 'Yicem Sucuk Kaşar', description: 'Yicem Sucuk Kaşar Tost' },
                    en: { name: 'Yicem with Sausage', description: 'Yicem Toast with Sausage' },
                    de: { name: 'Yicem mit Wurst', description: 'Yicem Toast mit Wurst' },
                    ru: { name: 'Йицем с колбасой', description: 'Йицем тост с колбасой' },
                    fr: { name: 'Yicem aux Saucisses', description: 'Toast Yicem aux Saucisses' },
                    ar: { name: 'يجم بالسجق', description: 'توست يجم بالسجق' }
                },
                ingredients: ['Kaşar', 'Sucuk', 'Turşu', 'Domates', '(İsteğe Bağlı Ketçap ve Mayonez)'],
                extras: [{
                    type: 'radio',
                    name: 'Servis',
                    translations: { tr: 'Servis', en: 'Serving', de: 'Servieren', ru: 'Подача', fr: 'Service', ar: 'تقديم' },
                    options: [
                        { id: 't3_s1', name: 'Tek', translations: { tr: 'Tek', en: 'Single', de: 'Einzeln', ru: 'Одиночный', fr: 'Seul', ar: 'فرادى' }, priceDelta: 0 },
                        { id: 't3_s2', name: 'Menü (Cips + İçecek)', translations: { tr: 'Menü (Cips + İçecek)', en: 'Menu (Chips + Drink)', de: 'Menü (Chips + Getränk)', ru: 'Меню (Чипсы + Напиток)', fr: 'Menu (Chips + Boisson)', ar: 'قائمة (شيبس + مشروب)' }, priceDelta: 80 }
                    ]
                }]
            },
            {
                id: 't4',
                category: 'ayvalik-tostu',
                price: 130,
                image: './pic/Ayvalik-Tostu/yicem-kasarli-jambon.jpg',
                translations: {
                    tr: { name: 'Yicem Kaşarlı Jambon', description: 'Yicem Kaşarlı Jambon Tost' },
                    en: { name: 'Yicem with Cheese', description: 'Yicem Toast with Cheese' },
                    de: { name: 'Yicem mit Käse', description: 'Yicem Toast mit Käse' },
                    ru: { name: 'Йицем с сыром', description: 'Йицем тост с сыром' },
                    fr: { name: 'Yicem au Fromage', description: 'Toast Yicem au Fromage' },
                    ar: { name: 'يجم بالجبن', description: 'توست يجم بالجبن' }
                },
                ingredients: ['Kaşar', 'Jambon', 'Turşu', 'Domates', '(İsteğe Bağlı Ketçap ve Mayonez)'],
                extras: [{
                    type: 'radio',
                    name: 'Servis',
                    translations: { tr: 'Servis', en: 'Serving', de: 'Servieren', ru: 'Подача', fr: 'Service', ar: 'تقديم' },
                    options: [
                        { id: 't4_s1', name: 'Tek', translations: { tr: 'Tek', en: 'Single', de: 'Einzeln', ru: 'Одиночный', fr: 'Seul', ar: 'فرادى' }, priceDelta: 0 },
                        { id: 't4_s2', name: 'Menü (Cips + İçecek)', translations: { tr: 'Menü (Cips + İçecek)', en: 'Menu (Chips + Drink)', de: 'Menü (Chips + Getränk)', ru: 'Меню (Чипсы + Напиток)', fr: 'Menu (Chips + Boisson)', ar: 'قائمة (شيبس + مشروب)' }, priceDelta: 80 }
                    ]
                }]
            },
            {
                id: 't5',
                category: 'ayvalik-tostu',
                price: 130,
                image: './pic/Ayvalik-Tostu/yicem-salam.jpg',
                translations: {
                    tr: { name: 'Yicem Salam Kaşarlı', description: 'Yicem Salam Kaşarlı Tost' },
                    en: { name: 'Yicem with Salami', description: 'Yicem Toast with Salami' },
                    de: { name: 'Yicem mit Salami', description: 'Yicem Toast mit Salami' },
                    ru: { name: 'Йицем с салями', description: 'Йицем тост с салями' },
                    fr: { name: 'Yicem au Salami', description: 'Toast Yicem au Salami' },
                    ar: { name: 'يجم بالسالمي', description: 'توست يجم بالسالمي' }
                },
                ingredients: ['Dana Salam', 'Kaşar', 'Turşu', 'Domates', '(İsteğe Bağlı Ketçap ve Mayonez)'],
                extras: [{
                    type: 'radio',
                    name: 'Servis',
                    translations: { tr: 'Servis', en: 'Serving', de: 'Servieren', ru: 'Подача', fr: 'Service', ar: 'تقديم' },
                    options: [
                        { id: 't5_s1', name: 'Tek', translations: { tr: 'Tek', en: 'Single', de: 'Einzeln', ru: 'Одиночный', fr: 'Seul', ar: 'فرادى' }, priceDelta: 0 },
                        { id: 't5_s2', name: 'Menü (Cips + İçecek)', translations: { tr: 'Menü (Cips + İçecek)', en: 'Menu (Chips + Drink)', de: 'Menü (Chips + Getränk)', ru: 'Меню (Чипсы + Напиток)', fr: 'Menu (Chips + Boisson)', ar: 'قائمة (شيبس + مشروب)' }, priceDelta: 80 }
                    ]
                }]
            },
            {
                id: 't6',
                category: 'ayvalik-tostu',
                price: 190,
                image: './pic/Ayvalik-Tostu/yicem-mega-karisik.jpg',
                translations: {
                    tr: { name: 'Yicem Mega Karışık', description: 'Yicem Mega Karışık Tost' },
                    en: { name: 'Yicem Mega Mixed', description: 'Yicem Mega Mixed Toast' },
                    de: { name: 'Yicem Mega Gemischt', description: 'Yicem Mega Gemischter Toast' },
                    ru: { name: 'Йицем Мега Смешанный', description: 'Йицем Мега Смешанный тост' },
                    fr: { name: 'Yicem Mega Mélangé', description: 'Toast Yicem Mega Mélangé' },
                    ar: { name: 'يجم ميجا مختلط', description: 'توست يجم ميجا مختلط' }
                },
                ingredients: ['Kaşar', 'Sucuk', 'Salam', 'Sosis', 'Jambon', 'Turşu', 'Domates', 'Rus Salatası', 'Ketçap', 'Mayonez'],
                extras: [{
                    type: 'radio',
                    name: 'Servis',
                    translations: { tr: 'Servis', en: 'Serving', de: 'Servieren', ru: 'Подача', fr: 'Service', ar: 'تقديم' },
                    options: [
                        { id: 't6_s1', name: 'Tek', translations: { tr: 'Tek', en: 'Single', de: 'Einzeln', ru: 'Одиночный', fr: 'Seul', ar: 'فرادى' }, priceDelta: 0 },
                        { id: 't6_s2', name: 'Menü (Cips + İçecek)', translations: { tr: 'Menü (Cips + İçecek)', en: 'Menu (Chips + Drink)', de: 'Menü (Chips + Getränk)', ru: 'Меню (Чипсы + Напиток)', fr: 'Menu (Chips + Boisson)', ar: 'قائمة (شيبس + مشروب)' }, priceDelta: 80 }
                    ]
                }]
            },
            {
                id: 't7',
                category: 'ayvalik-tostu',
                price: 220,
                image: './pic/Ayvalik-Tostu/yicem-super-karisik.jpg',
                translations: {
                    tr: { name: 'Yicem Super Karışık', description: 'Yicem Super Karışık Tost' },
                    en: { name: 'Yicem Super Mixed', description: 'Yicem Super Mixed Toast' },
                    de: { name: 'Yicem Super Gemischt', description: 'Yicem Super Gemischter Toast' },
                    ru: { name: 'Йицем Супер Смешанный', description: 'Йицем Супер Смешанный тост' },
                    fr: { name: 'Yicem Super Mélangé', description: 'Toast Yicem Super Mélangé' },
                    ar: { name: 'يجم سوبر مختلط', description: 'توست يجم سوبر مختلط' }
                },
                ingredients: ['Çift Katlı Ekmek', 'Kaşar', 'Sucuk', 'Salam', 'Sosis', 'Turşu', 'Domates', 'Rus Salatası', 'Ketçap', 'Mayonez'],
                extras: [{
                    type: 'radio',
                    name: 'Servis',
                    translations: { tr: 'Servis', en: 'Serving', de: 'Servieren', ru: 'Подача', fr: 'Service', ar: 'تقديم' },
                    options: [
                        { id: 't7_s1', name: 'Tek', translations: { tr: 'Tek', en: 'Single', de: 'Einzeln', ru: 'Одиночный', fr: 'Seul', ar: 'فرادى' }, priceDelta: 0 },
                        { id: 't7_s2', name: 'Menü (Cips + İçecek)', translations: { tr: 'Menü (Cips + İçecek)', en: 'Menu (Chips + Drink)', de: 'Menü (Chips + Getränk)', ru: 'Меню (Чипсы + Напиток)', fr: 'Menu (Chips + Boisson)', ar: 'قائمة (شيبس + مشروب)' }, priceDelta: 80 }
                    ]
                }]
            },
            {
                id: 't8',
                category: 'ayvalik-tostu',
                price: 300,
                image: './pic/Ayvalik-Tostu/yicem-donerli.jpg',
                translations: {
                    tr: { name: 'Yicem Dönerli', description: 'Yicem Dönerli Tost' },
                    en: { name: 'Yicem with Döner', description: 'Yicem Toast with Döner' },
                    de: { name: 'Yicem mit Döner', description: 'Yicem Toast mit Döner' },
                    ru: { name: 'Йицем с дёнером', description: 'Йицем тост с дёнером' },
                    fr: { name: 'Yicem au Döner', description: 'Toast Yicem au Döner' },
                    ar: { name: 'يجم بالدونر', description: 'توست يجم بالدونر' }
                },
                ingredients: ['Kaşar', 'Et Döner (100gr)', 'Marul', 'Turşu', 'Domates', '(İsteğe Bağlı Ketçap ve Mayonez)'],
                extras: [{
                    type: 'radio',
                    name: 'Servis',
                    translations: { tr: 'Servis', en: 'Serving', de: 'Servieren', ru: 'Подача', fr: 'Service', ar: 'تقديم' },
                    options: [
                        { id: 't8_s1', name: 'Tek', translations: { tr: 'Tek', en: 'Single', de: 'Einzeln', ru: 'Одиночный', fr: 'Seul', ar: 'فرادى' }, priceDelta: 0 },
                        { id: 't8_s2', name: 'Menü (Cips + İçecek)', translations: { tr: 'Menü (Cips + İçecek)', en: 'Menu (Chips + Drink)', de: 'Menü (Chips + Getränk)', ru: 'Меню (Чипсы + Напиток)', fr: 'Menu (Chips + Boisson)', ar: 'قائمة (شيبس + مشروب)' }, priceDelta: 80 }
                    ]
                }]
            },
            {
                id: 't9',
                category: 'ayvalik-tostu',
                price: 200,
                image: './pic/Ayvalik-Tostu/yicem-evkofteli.jpg',
                translations: {
                    tr: { name: 'Yicem Ev Köfteli', description: 'Yicem Ev Köfteli Tost' },
                    en: { name: 'Yicem with Meatballs', description: 'Yicem Toast with Meatballs' },
                    de: { name: 'Yicem mit Fleischbällchen', description: 'Yicem Toast mit Fleischbällchen' },
                    ru: { name: 'Йицем с фрикадельками', description: 'Йицем тост с фрикадельками' },
                    fr: { name: 'Yicem aux Boulettes', description: 'Toast Yicem aux Boulettes' },
                    ar: { name: 'يجم بالكفتة', description: 'توست يجم بالكفتة' }
                },
                ingredients: ['Ev Köftesi (120gr)', 'Marul', 'Turşu', 'Domates', '(İsteğe Bağlı Ketçap ve Mayonez + Rus Salatası)'],
                extras: [{
                    type: 'radio',
                    name: 'Servis',
                    translations: { tr: 'Servis', en: 'Serving', de: 'Servieren', ru: 'Подача', fr: 'Service', ar: 'تقديم' },
                    options: [
                        { id: 't9_s1', name: 'Tek', translations: { tr: 'Tek', en: 'Single', de: 'Einzeln', ru: 'Одиночный', fr: 'Seul', ar: 'فرادى' }, priceDelta: 0 },
                        { id: 't9_s2', name: 'Menü (Cips + İçecek)', translations: { tr: 'Menü (Cips + İçecek)', en: 'Menu (Chips + Drink)', de: 'Menü (Chips + Getränk)', ru: 'Меню (Чипсы + Напиток)', fr: 'Menu (Chips + Boisson)', ar: 'قائمة (شيبس + مشروب)' }, priceDelta: 80 }
                    ]
                }]
            },
            {
                id: 't10',
                category: 'ayvalik-tostu',
                price: 130,
                image: './pic/Ayvalik-Tostu/yicem-schnitzel.jpg',
                translations: {
                    tr: { name: 'Yicem Schnitzel', description: 'Yicem Schnitzel Tost' },
                    en: { name: 'Yicem Schnitzel', description: 'Yicem Schnitzel Toast' },
                    de: { name: 'Yicem Schnitzel', description: 'Yicem Schnitzel Toast' },
                    ru: { name: 'Йицем Шницель', description: 'Йицем тост с шницелем' },
                    fr: { name: 'Yicem Schnitzel', description: 'Toast Yicem Schnitzel' },
                    ar: { name: 'يجم شنيتزل', description: 'توست يجم شنيتزل' }
                },
                ingredients: ['Kaşar', 'Sucuk', 'Turşu', 'Domates', '(İsteğe Bağlı Ketçap ve Mayonez)'],
                extras: [{
                    type: 'radio',
                    name: 'Servis',
                    translations: { tr: 'Servis', en: 'Serving', de: 'Servieren', ru: 'Подача', fr: 'Service', ar: 'تقديم' },
                    options: [
                        { id: 't10_s1', name: 'Tek', translations: { tr: 'Tek', en: 'Single', de: 'Einzeln', ru: 'Одиночный', fr: 'Seul', ar: 'فرادى' }, priceDelta: 0 },
                        { id: 't10_s2', name: 'Menü (Cips + İçecek)', translations: { tr: 'Menü (Cips + İçecek)', en: 'Menu (Chips + Drink)', de: 'Menü (Chips + Getränk)', ru: 'Меню (Чипсы + Напиток)', fr: 'Menu (Chips + Boisson)', ar: 'قائمة (شيبس + مشروب)' }, priceDelta: 80 }
                    ]
                }]
            },
            {
                id: 't11',
                category: 'ayvalik-tostu',
                price: 210,
                image: './pic/Ayvalik-Tostu/yicem-kavurma.jpg',
                translations: {
                    tr: { name: 'Yicem Kavurma Kaşar', description: 'Yicem Kavurma Kaşar Tost' },
                    en: { name: 'Yicem with Stew', description: 'Yicem Toast with Stew' },
                    de: { name: 'Yicem mit Eintopf', description: 'Yicem Toast mit Eintopf' },
                    ru: { name: 'Йицем с тушеным мясом', description: 'Йицем тост с тушеным мясом' },
                    fr: { name: 'Yicem au Ragoût', description: 'Toast Yicem au Ragoût' },
                    ar: { name: 'يجم باللحم المطبوخ', description: 'توست يجم باللحم المطبوخ' }
                },
                ingredients: ['Kaşar', 'Kavurma (70gr)', 'Turşu', 'Domates'],
                extras: [{
                    type: 'radio',
                    name: 'Servis',
                    translations: { tr: 'Servis', en: 'Serving', de: 'Servieren', ru: 'Подача', fr: 'Service', ar: 'تقديم' },
                    options: [
                        { id: 't11_s1', name: 'Tek', translations: { tr: 'Tek', en: 'Single', de: 'Einzeln', ru: 'Одиночный', fr: 'Seul', ar: 'فرادى' }, priceDelta: 0 },
                        { id: 't11_s2', name: 'Menü (Cips + İçecek)', translations: { tr: 'Menü (Cips + İçecek)', en: 'Menu (Chips + Drink)', de: 'Menü (Chips + Getränk)', ru: 'Меню (Чипсы + Напиток)', fr: 'Menu (Chips + Boisson)', ar: 'قائمة (شيبس + مشروب)' }, priceDelta: 80 }
                    ]
                }]
            },
            {
                id: 't12',
                category: 'ayvalik-tostu',
                price: 170,
                image: './pic/Ayvalik-Tostu/yicem-yengenn.jpg',
                translations: {
                    tr: { name: 'Yicem Yengen', description: 'Yicem Yengen Tost' },
                    en: { name: 'Yicem Yengen', description: 'Yicem Yengen Toast' },
                    de: { name: 'Yicem Yengen', description: 'Yicem Yengen Toast' },
                    ru: { name: 'Йицем Йенген', description: 'Йицем тост Йенген' },
                    fr: { name: 'Yicem Yengen', description: 'Toast Yicem Yengen' },
                    ar: { name: 'يجم ينغن', description: 'توست يجم ينغن' }
                },
                ingredients: ['Sosis', 'Sucuk', 'Kaşar', 'Turşu', 'Ketçap', 'Mayonez'],
                extras: [
                    {
                        type: 'radio',
                        name: 'Servis',
                        translations: { tr: 'Servis', en: 'Serving', de: 'Servieren', ru: 'Подача', fr: 'Service', ar: 'تقديم' },
                        options: [
                            { id: 't12_s1', name: 'Tek', translations: { tr: 'Tek', en: 'Single', de: 'Einzeln', ru: 'Одиночный', fr: 'Seul', ar: 'فرادى' }, priceDelta: 0 },
                            { id: 't12_s2', name: 'Menü (Cips + İçecek)', translations: { tr: 'Menü (Cips + İçecek)', en: 'Menu (Chips + Drink)', de: 'Menü (Chips + Getränk)', ru: 'Меню (Чипсы + Напиток)', fr: 'Menu (Chips + Boisson)', ar: 'قائمة (شيبس + مشروب)' }, priceDelta: 80 }
                        ]
                    }
                ]
            },
            // Bistro kategorisi - JSON'dan gömülü veriler
            {
                id: 'b1',
                category: 'bistro',
                price: 180,
                image: this.getAutoImagePath('b1', 'Café de Paris', 'Bistro'),
                translations: {
                    tr: { name: 'Café de Paris', description: 'Café de Paris Tavuk' },
                    en: { name: 'Café de Paris', description: 'Café de Paris Chicken' },
                    de: { name: 'Café de Paris', description: 'Café de Paris Hähnchen' },
                    ru: { name: 'Кафе де Пари', description: 'Кафе де Пари Курица' },
                    fr: { name: 'Café de Paris', description: 'Poulet Café de Paris' },
                    ar: { name: 'كافيه دي باريس', description: 'دجاج كافيه دي باريس' }
                },
                ingredients: ['Tavuk', 'Café de Paris Sosu', 'Pilav', 'Salata'],
                extras: []
            },
            {
                id: 'b2',
                category: 'bistro',
                price: 200,
                image: this.getAutoImagePath('b2', 'Barbekü Soslu Tavuk', 'Bistro'),
                translations: {
                    tr: { name: 'Barbekü Soslu Tavuk', description: 'Barbekü Soslu Tavuk' },
                    en: { name: 'BBQ Sauce Chicken', description: 'BBQ Sauce Chicken' },
                    de: { name: 'Hähnchen mit BBQ-Sauce', description: 'Hähnchen mit BBQ-Sauce' },
                    ru: { name: 'Курица с соусом барбекю', description: 'Курица с соусом барбекю' },
                    fr: { name: 'Poulet à la Sauce BBQ', description: 'Poulet à la Sauce BBQ' },
                    ar: { name: 'دجاج بصلصة الباربكيو', description: 'دجاج بصلصة الباربكيو' }
                },
                ingredients: ['Tavuk', 'Barbekü Sosu', 'Pilav', 'Salata'],
                extras: []
            },
            {
                id: 'b3',
                category: 'bistro',
                price: 190,
                image: this.getAutoImagePath('b3', 'Chicken Quesadilla', 'Bistro'),
                translations: {
                    tr: { name: 'Chicken Quesadilla', description: 'Chicken Quesadilla' },
                    en: { name: 'Chicken Quesadilla', description: 'Chicken Quesadilla' },
                    de: { name: 'Hähnchen Quesadilla', description: 'Hähnchen Quesadilla' },
                    ru: { name: 'Куриная кесадилья', description: 'Куриная кесадилья' },
                    fr: { name: 'Quesadilla au Poulet', description: 'Quesadilla au Poulet' },
                    ar: { name: 'كيساديلا دجاج', description: 'كيساديلا دجاج' }
                },
                ingredients: ['Tavuk', 'Peynir', 'Tortilla', 'Soğan', 'Biber'],
                extras: []
            },
            {
                id: 'b4',
                category: 'bistro',
                price: 220,
                image: this.getAutoImagePath('b4', 'Chicken Stroganoff', 'Bistro'),
                translations: {
                    tr: { name: 'Chicken Stroganoff', description: 'Chicken Stroganoff' },
                    en: { name: 'Chicken Stroganoff', description: 'Chicken Stroganoff' },
                    de: { name: 'Hähnchen Stroganoff', description: 'Hähnchen Stroganoff' },
                    ru: { name: 'Куриный строганов', description: 'Куриный строганов' },
                    fr: { name: 'Stroganoff au Poulet', description: 'Stroganoff au Poulet' },
                    ar: { name: 'ستروغانوف دجاج', description: 'ستروغانوف دجاج' }
                },
                ingredients: ['Tavuk', 'Krema', 'Mantar', 'Soğan', 'Pilav'],
                extras: []
            },
            {
                id: 'b5',
                category: 'bistro',
                price: 160,
                image: this.getAutoImagePath('b5', 'Dağ Kekiği Kremalı', 'Bistro'),
                translations: {
                    tr: { name: 'Dağ Kekiği Kremalı', description: 'Dağ Kekiği Kremalı Tavuk' },
                    en: { name: 'Mountain Thyme Cream', description: 'Mountain Thyme Cream Chicken' },
                    de: { name: 'Bergthymian-Sahne', description: 'Bergthymian-Sahne Hähnchen' },
                    ru: { name: 'Курица с кремом из горного тимьяна', description: 'Курица с кремом из горного тимьяна' },
                    fr: { name: 'Poulet à la Crème de Thym des Montagnes', description: 'Poulet à la Crème de Thym des Montagnes' },
                    ar: { name: 'دجاج بالكريمة والزعتر الجبلي', description: 'دجاج بالكريمة والزعتر الجبلي' }
                },
                ingredients: ['Tavuk', 'Krema', 'Dağ Kekiği', 'Pilav', 'Salata'],
                extras: []
            },
            {
                id: 'b6',
                category: 'bistro',
                price: 200,
                image: this.getAutoImagePath('b6', 'Kaşarlı Mantarlı Quesadilla', 'Bistro'),
                translations: {
                    tr: { name: 'Kaşarlı Mantarlı Quesadilla', description: 'Kaşarlı Mantarlı Quesadilla' },
                    en: { name: 'Cheesy Mushroom Quesadilla', description: 'Cheesy Mushroom Quesadilla' },
                    de: { name: 'Käse-Pilz Quesadilla', description: 'Käse-Pilz Quesadilla' },
                    ru: { name: 'Кесадилья с сыром и грибами', description: 'Кесадилья с сыром и грибами' },
                    fr: { name: 'Quesadilla au Fromage et aux Champignons', description: 'Quesadilla au Fromage et aux Champignons' },
                    ar: { name: 'كيساديلا بالجبن والفطر', description: 'كيساديلا بالجبن والفطر' }
                },
                ingredients: ['Kaşar Peyniri', 'Mantar', 'Tortilla', 'Soğan', 'Biber'],
                extras: []
            },
            {
                id: 'b7',
                category: 'bistro',
                price: 180,
                image: this.getAutoImagePath('b7', 'Mantarlı Köri Tavuk', 'Bistro'),
                translations: {
                    tr: { name: 'Mantarlı Köri Tavuk', description: 'Mantarlı Köri Tavuk' },
                    en: { name: 'Mushroom Curry Chicken', description: 'Mushroom Curry Chicken' },
                    de: { name: 'Hähnchen mit Pilz-Curry', description: 'Hähnchen mit Pilz-Curry' },
                    ru: { name: 'Курица с грибами и карри', description: 'Курица с грибами и карри' },
                    fr: { name: 'Poulet au Curry aux Champignons', description: 'Poulet au Curry aux Champignons' },
                    ar: { name: 'دجاج بالكاري والفطر', description: 'دجاج بالكاري والفطر' }
                },
                ingredients: ['Tavuk', 'Mantar', 'Köri', 'Pilav', 'Salata'],
                extras: []
            },
            {
                id: 'b8',
                category: 'bistro',
                price: 190,
                image: this.getAutoImagePath('b8', 'Mexican Soslu Tavuk', 'Bistro'),
                translations: {
                    tr: { name: 'Mexican Soslu Tavuk', description: 'Mexican Soslu Tavuk' },
                    en: { name: 'Mexican Sauce Chicken', description: 'Mexican Sauce Chicken' },
                    de: { name: 'Hähnchen mit mexikanischer Sauce', description: 'Hähnchen mit mexikanischer Sauce' },
                    ru: { name: 'Курица с мексиканским соусом', description: 'Курица с мексиканским соусом' },
                    fr: { name: 'Poulet à la Sauce Mexicaine', description: 'Poulet à la Sauce Mexicaine' },
                    ar: { name: 'دجاج بالصلصة المكسيكية', description: 'دجاج بالصلصة المكسيكية' }
                },
                ingredients: ['Tavuk', 'Mexican Sosu', 'Pilav', 'Salata'],
                extras: []
            },
            {
                id: 'b9',
                category: 'bistro',
                price: 170,
                image: this.getAutoImagePath('b9', 'Tatlı Acı Soslu Tavuk', 'Bistro'),
                translations: {
                    tr: { name: 'Tatlı Acı Soslu Tavuk', description: 'Tatlı Acı Soslu Tavuk' },
                    en: { name: 'Sweet and Sour Chicken', description: 'Sweet and Sour Chicken' },
                    de: { name: 'Hähnchen mit süß-saurer Sauce', description: 'Hähnchen mit süß-saurer Sauce' },
                    ru: { name: 'Курица с кисло-сладким соусом', description: 'Курица с кисло-сладким соусом' },
                    fr: { name: 'Poulet à la Sauce Aigre-Douce', description: 'Poulet à la Sauce Aigre-Douce' },
                    ar: { name: 'دجاج بالصلصة الحلوة والحامضة', description: 'دجاج بالصلصة الحلوة والحامضة' }
                },
                ingredients: ['Tavuk', 'Tatlı Acı Sosu', 'Pilav', 'Salata'],
                extras: []
            },
            {
                id: 'b10',
                category: 'bistro',
                price: 160,
                image: this.getAutoImagePath('b10', 'Tavuk Wrap', 'Bistro'),
                translations: {
                    tr: { name: 'Tavuk Wrap', description: 'Tavuk Wrap' },
                    en: { name: 'Chicken Wrap', description: 'Chicken Wrap' },
                    de: { name: 'Hähnchen Wrap', description: 'Hähnchen Wrap' },
                    ru: { name: 'Куриный рэп', description: 'Куриный рэп' },
                    fr: { name: 'Wrap au Poulet', description: 'Wrap au Poulet' },
                    ar: { name: 'راب دجاج', description: 'راب دجاج' }
                },
                ingredients: ['Tavuk', 'Lavash', 'Marul', 'Domates', 'Soğan'],
                extras: []
            },
            {
                id: 'b11',
                category: 'bistro',
                price: 150,
                image: this.getAutoImagePath('b11', 'Viyana', 'Bistro'),
                translations: {
                    tr: { name: 'Viyana', description: 'Viyana Schnitzel' },
                    en: { name: 'Vienna', description: 'Vienna Schnitzel' },
                    de: { name: 'Wien', description: 'Wiener Schnitzel' },
                    ru: { name: 'Вена', description: 'Венский шницель' },
                    fr: { name: 'Vienne', description: 'Schnitzel de Vienne' },
                    ar: { name: 'فيينا', description: 'شنيتزل فيينا' }
                },
                ingredients: ['Schnitzel', 'Pilav', 'Salata', 'Limon'],
                extras: []
            },
            {
                id: 'litrelik-icecek',
                category: 'icecekler',
                price: 60,
                image: './images/litrelikicecek.jpg',
                translations: {
                    tr: { name: 'Litrelik İçecek', description: 'Litrelik İçecek' },
                    en: { name: 'Liter Drink', description: 'Liter Drink' },
                    de: { name: 'Litergetränk', description: 'Litergetränk' },
                    ru: { name: 'Литровый напиток', description: 'Литровый напиток' },
                    fr: { name: 'Boisson d\'un Litre', description: 'Boisson d\'un Litre' },
                    ar: { name: 'مشروب لتر', description: 'مشروب لتر' }
                },
                ingredients: ['İçecek'],
                extras: []
            }
        ];
    }

    // Get embedded manti products
    getMantiProducts() {
        const mantiData = {
            "id": "manti",
            "name": {
                "tr": "Mantı",
                "en": "Manti",
                "de": "Manti",
                "ru": "Манты",
                "fr": "Manti",
                "ar": "منتي"
            },
            "products": [
                {
                    "id": "ma1",
                    "name": {
                        "tr": "Ev Yapımı Mantı",
                        "en": "Homemade Manti",
                        "de": "Hausgemachte Manti",
                        "ru": "Домашние манты",
                        "fr": "Manti Maison",
                        "ar": "منتي منزلي"
                    },
                    "price": 200,
                    "description": {
                        "tr": "Haşlanmış Mantı, %100 Dana Kıyma (250gr), Tereyağında Kavrulmuş Pul Biber ve Nane Sosu",
                        "en": "Boiled Manti, 100% Beef Mince (250gr), Red Pepper Flakes and Mint Sauce Fried in Butter",
                        "de": "Gekochte Manti, 100% Rindfleisch-Hackfleisch (250gr), In Butter gebratene Paprikaflocken und Minzsauce",
                        "ru": "Вареные манты, 100% говяжий фарш (250гр), Обжаренные в масле хлопья перца и мятный соус",
                        "fr": "Manti Bouillis, 100% Viande de Bœuf Hachée (250gr), Flocons de Piment Frits au Beurre et Sauce à la Menthe",
                        "ar": "منتي مسلوق، 100% لحم بقري مفروم (250غ)، رقائق فلفل محمرة بالزبدة وصلصة النعناع"
                    },
                    "contents": {
                        "tr": [
                            "Haşlanmış Mantı",
                            "%100 Dana Kıyma (250gr)",
                            "Tereyağında Kavrulmuş Pul Biber ve Nane Sosu"
                        ],
                        "en": [
                            "Boiled Manti",
                            "100% Beef Mince (250gr)",
                            "Red Pepper Flakes and Mint Sauce Fried in Butter"
                        ],
                        "de": [
                            "Gekochte Manti",
                            "100% Rindfleisch-Hackfleisch (250gr)",
                            "In Butter gebratene Paprikaflocken und Minzsauce"
                        ],
                        "ru": [
                            "Вареные манты",
                            "100% говяжий фарш (250гр)",
                            "Обжаренные в масле хлопья перца и мятный соус"
                        ],
                        "fr": [
                            "Manti Bouillis",
                            "100% Viande de Bœuf Hachée (250gr)",
                            "Flocons de Piment Frits au Beurre et Sauce à la Menthe"
                        ],
                        "ar": [
                            "منتي مسلوق",
                            "100% لحم بقري مفروم (250غ)",
                            "رقائق فلفل محمرة بالزبدة وصلصة النعناع"
                        ]
                    },
                    "options": [
                        {
                            "id": "ma1_o1",
                            "label": {
                                "tr": "Sade Yoğurt",
                                "en": "Plain Yogurt",
                                "de": "Naturjoghurt",
                                "ru": "Обычный йогурт",
                                "fr": "Yaourt Nature",
                                "ar": "زبادي عادي"
                            },
                            "price": 0
                        },
                        {
                            "id": "ma1_o2",
                            "label": {
                                "tr": "Sarımsaklı Yoğurt",
                                "en": "Garlic Yogurt",
                                "de": "Knoblauchjoghurt",
                                "ru": "Йогурт с чесноком",
                                "fr": "Yaourt à l'Ail",
                                "ar": "زبادي بالثوم"
                            },
                            "price": 0
                        }
                    ],
                    "extras": {
                        "drinkOptions": [
                            {
                                "id": "ma1_drink1",
                                "name": {
                                    "tr": "Ayran",
                                    "en": "Ayran",
                                    "de": "Ayran",
                                    "ru": "Айран",
                                    "fr": "Ayran",
                                    "ar": "عيران"
                                },
                                "price": 40
                            },
                            {
                                "id": "ma1_drink2",
                                "name": {
                                    "tr": "Kutu İçecek",
                                    "en": "Can Drink",
                                    "de": "Dosengetränk",
                                    "ru": "Напиток в банке",
                                    "fr": "Boisson en Canette",
                                    "ar": "مشروب معلب"
                                },
                                "price": 60
                            },
                            {
                                "id": "ma1_drink3",
                                "name": {
                                    "tr": "Litrelik İçecek",
                                    "en": "Liter Drink",
                                    "de": "Litergetränk",
                                    "ru": "Литровый напиток",
                                    "fr": "Boisson d'un Litre",
                                    "ar": "مشروب لتر"
                                },
                                "price": 90
                            }
                        ]
                    }
                }
            ]
        };

        return mantiData.products.map(product => ({
            id: product.id,
            category: 'manti',
            price: product.price,
            image: `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&sig=${product.id}`,
            translations: {
                tr: { name: product.name.tr, description: product.description.tr },
                en: { name: product.name.en, description: product.description.en },
                de: { name: product.name.de, description: product.description.de },
                ru: { name: product.name.ru, description: product.description.ru },
                fr: { name: product.name.fr, description: product.description.fr },
                ar: { name: product.name.ar, description: product.description.ar }
            },
            ingredients: product.contents[this.currentLanguage] || product.contents.tr || [],
            extras: [
                {
                    type: 'radio',
                    name: 'Yoğurt Seçeneği',
                    translations: {
                        tr: 'Yoğurt Seçeneği',
                        en: 'Yogurt Option',
                        de: 'Joghurt-Option',
                        ru: 'Вариант йогурта',
                        fr: 'Option Yaourt',
                        ar: 'خيار الزبادي'
                    },
                    options: product.options.map(option => ({
                        id: option.id,
                        name: option.label[this.currentLanguage] || option.label.tr,
                        translations: {
                            tr: option.label.tr,
                            en: option.label.en,
                            de: option.label.de,
                            ru: option.label.ru,
                            fr: option.label.fr,
                            ar: option.label.ar
                        },
                        priceDelta: option.price
                    }))
                },
                {
                    type: 'checkbox',
                    name: 'İçecek Seçenekleri',
                    translations: {
                        tr: 'İçecek Seçenekleri',
                        en: 'Drink Options',
                        de: 'Getränkeoptionen',
                        ru: 'Варианты напитков',
                        fr: 'Options de Boisson',
                        ar: 'خيارات المشروبات'
                    },
                    options: product.extras.drinkOptions.map(drink => ({
                        id: drink.id,
                        name: drink.name[this.currentLanguage] || drink.name.tr,
                        translations: {
                            tr: drink.name.tr,
                            en: drink.name.en,
                            de: drink.name.de,
                            ru: drink.name.ru,
                            fr: drink.name.fr,
                            ar: drink.name.ar
                        },
                        priceDelta: drink.price
                    }))
                }
            ]
        }));
    }

    // Get embedded kofte products
    getKofteProducts() {
        const data = {
            "id": "kofte",
            "name": {
                "tr": "Köfte Spesiyel",
                "en": "Meatball Special",
                "de": "Frikadellen Spezial",
                "ru": "Специальные фрикадельки",
                "fr": "Spécial Boulettes",
                "ar": "كفتة خاصة"
            },
            "products": [
                {
                    "id": "k1",
                    "name": {
                        "tr": "Şefin Izgara Köftesi",
                        "en": "Chef's Grilled Meatballs",
                        "de": "Chefs Gegrillte Frikadellen",
                        "ru": "Жареные фрикадельки шефа",
                        "fr": "Boulettes Grillées du Chef",
                        "ar": "كفتة مشوية من الشيف"
                    },
                    "price": 300,
                    "description": {
                        "tr": "180gr Izgara Köfte, Pilav, Salata",
                        "en": "180gr Grilled Meatballs, Rice, Salad",
                        "de": "180gr Gegrillte Frikadellen, Reis, Salat",
                        "ru": "180г жареные фрикадельки, рис, салат",
                        "fr": "180gr Boulettes Grillées, Riz, Salade",
                        "ar": "180غ كفتة مشوية، أرز، سلطة"
                    },
                    "contents": {
                        "tr": ["180gr Izgara Köfte", "Pilav", "Salata"],
                        "en": ["180gr Grilled Meatballs", "Rice", "Salad"],
                        "de": ["180gr Gegrillte Frikadellen", "Reis", "Salat"],
                        "ru": ["180г жареные фрикадельки", "Рис", "Салат"],
                        "fr": ["180gr Boulettes Grillées", "Riz", "Salade"],
                        "ar": ["180غ كفتة مشوية", "أرز", "سلطة"]
                    },
                    "options": [
                        {
                            "id": "k1_o1",
                            "label": {"tr": "Sade Köfte", "en": "Plain Meatballs", "de": "Einfache Frikadellen", "ru": "Обычные фрикадельки", "fr": "Boulettes Simples", "ar": "كفتة عادية"},
                            "price": 0
                        },
                        {
                            "id": "k1_o2",
                            "label": {"tr": "Menü (Cips + Kola)", "en": "Menu (Chips + Cola)", "de": "Menü (Chips + Cola)", "ru": "Меню (Чипсы + Кола)", "fr": "Menu (Chips + Cola)", "ar": "قائمة (رقائق + كولا)"},
                            "price": 80
                        }
                    ]
                },
                {
                    "id": "k2",
                    "name": {
                        "tr": "Ekmek Arası Köfte",
                        "en": "Meatball Sandwich",
                        "de": "Frikadellen-Sandwich",
                        "ru": "Сэндвич с фрикадельками",
                        "fr": "Sandwich aux Boulettes",
                        "ar": "ساندويتش كفتة"
                    },
                    "price": 200,
                    "description": {
                        "tr": "120gr Ekmek Arası Köfte",
                        "en": "120gr Meatball Sandwich",
                        "de": "120gr Frikadellen-Sandwich",
                        "ru": "120г сэндвич с фрикадельками",
                        "fr": "120gr Sandwich aux Boulettes",
                        "ar": "120غ ساندويتش كفتة"
                    },
                    "contents": {
                        "tr": ["120gr Ekmek Arası Köfte"],
                        "en": ["120gr Meatball Sandwich"],
                        "de": ["120gr Frikadellen-Sandwich"],
                        "ru": ["120г сэндвич с фрикадельками"],
                        "fr": ["120gr Sandwich aux Boulettes"],
                        "ar": ["120غ ساندويتش كفتة"]
                    },
                    "options": [
                        {"id": "k2_o1", "label": {"tr": "Sade Ekmek Arası", "en": "Plain Sandwich", "de": "Einfaches Sandwich", "ru": "Обычный сэндвич", "fr": "Sandwich Simple", "ar": "ساندويتش عادي"}, "price": 0},
                        {"id": "k2_o2", "label": {"tr": "Menü (Cips + Kola)", "en": "Menu (Chips + Cola)", "de": "Menü (Chips + Cola)", "ru": "Меню (Чипсы + Кола)", "fr": "Menu (Chips + Cola)", "ar": "قائمة (رقائق + كولا)"}, "price": 80}
                    ]
                },
                {
                    "id": "k3",
                    "name": {
                        "tr": "Ekmek Arası Kaşarlı Köfte",
                        "en": "Cheddar Meatball Sandwich",
                        "de": "Frikadellen-Sandwich mit Käse",
                        "ru": "Сэндвич с фрикадельками и сыром",
                        "fr": "Sandwich aux Boulettes au Fromage",
                        "ar": "ساندويتش كفتة بالجبن"
                    },
                    "price": 220,
                    "description": {
                        "tr": "120gr Ekmek Arası Kaşarlı Köfte",
                        "en": "120gr Cheddar Meatball Sandwich",
                        "de": "120gr Frikadellen-Sandwich mit Käse",
                        "ru": "120г сэндвич с фрикадельками и сыром",
                        "fr": "120gr Sandwich aux Boulettes au Fromage",
                        "ar": "120غ ساندويتش كفتة بالجبن"
                    },
                    "contents": {
                        "tr": ["120gr Ekmek Arası Kaşarlı Köfte"],
                        "en": ["120gr Cheddar Meatball Sandwich"],
                        "de": ["120gr Frikadellen-Sandwich mit Käse"],
                        "ru": ["120г сэндвич с фрикадельками и сыром"],
                        "fr": ["120gr Sandwich aux Boulettes au Fromage"],
                        "ar": ["120غ ساندويتش كفتة بالجبن"]
                    },
                    "options": [
                        {"id": "k3_o1", "label": {"tr": "Sade Kaşarlı Köfte", "en": "Plain Cheddar Meatballs", "de": "Einfache Frikadellen mit Käse", "ru": "Обычные фрикадельки с сыром", "fr": "Boulettes au Fromage Simples", "ar": "كفتة بالجبن عادية"}, "price": 0},
                        {"id": "k3_o2", "label": {"tr": "Menü (Cips + Kola)", "en": "Menu (Chips + Cola)", "de": "Menü (Chips + Cola)", "ru": "Меню (Чипсы + Кола)", "fr": "Menu (Chips + Cola)", "ar": "قائمة (رقائق + كولا)"}, "price": 80}
                    ]
                }
            ]
        };

        return data.products.map(product => ({
            id: product.id,
            category: 'kofte-spesiyel',
            price: product.price,
            image: `https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop&sig=${product.id}`,
            translations: {
                tr: { name: product.name.tr, description: product.description.tr },
                en: { name: product.name.en, description: product.description.en },
                de: { name: product.name.de, description: product.description.de },
                ru: { name: product.name.ru, description: product.description.ru },
                fr: { name: product.name.fr, description: product.description.fr },
                ar: { name: product.name.ar, description: product.description.ar }
            },
            ingredients: product.contents[this.currentLanguage] || product.contents.tr || [],
            extras: [
                {
                    type: 'radio',
                    name: 'Servis',
                    translations: { tr: 'Servis', en: 'Serving', de: 'Servieren', ru: 'Подача', fr: 'Service', ar: 'تقديم' },
                    options: (product.options || []).map(option => ({
                        id: option.id,
                        name: option.label[this.currentLanguage] || option.label.tr,
                        translations: {
                            tr: option.label.tr,
                            en: option.label.en,
                            de: option.label.de,
                            ru: option.label.ru,
                            fr: option.label.fr,
                            ar: option.label.ar
                        },
                        priceDelta: option.price
                    }))
                }
            ]
        }));
    }

    // Minimal seed products used when JSON cannot be fetched
    getSeedProducts() {
        return [];
    }

    // Allow setting products from external JSON
    setProductsFromJson(jsonData) {
        try {
            const data = Array.isArray(jsonData) ? jsonData : JSON.parse(jsonData);
            if (!Array.isArray(data)) return;
            this.products = data;
            this.renderProducts();
        } catch (e) {
            console.error('Invalid products JSON', e);
        }
    }

    // Allow setting products directly from pizza.json structure
    setProductsFromPizzaJson(jsonData) {
        try {
            const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
            if (!data || !Array.isArray(data.products)) return;
            this.products = data.products.map(product => ({
                id: product.id,
                category: 'pizzalar',
                price: product.price,
                image: `https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&sig=${product.id}`,
                translations: {
                    tr: { name: product.name.tr, description: product.description.tr },
                    en: { name: product.name.en, description: product.description.en },
                    de: { name: product.name.de, description: product.description.de },
                    ru: { name: product.name.ru, description: product.description.ru },
                    fr: { name: product.name.fr, description: product.description.fr },
                    ar: { name: product.name.ar, description: product.description.ar }
                },
                ingredients: product.contents[this.currentLanguage] || product.contents.tr || [],
                extras: [{
                    type: 'radio',
                    name: 'Boyut',
                    translations: {
                        tr: 'Boyut',
                        en: 'Size',
                        de: 'Größe',
                        ru: 'Размер',
                        fr: 'Taille',
                        ar: 'الحجم'
                    },
                    options: (product.options || []).map(option => ({
                        id: option.id,
                        name: option.label[this.currentLanguage] || option.label.tr,
                        translations: {
                            tr: option.label.tr,
                            en: option.label.en,
                            de: option.label.de,
                            ru: option.label.ru,
                            fr: option.label.fr,
                            ar: option.label.ar
                        },
                        priceDelta: option.price
                    }))
                }]
            }));
            this.renderProducts();
        } catch (e) {
            console.error('Invalid pizza JSON structure', e);
        }
    }

    renderProducts() {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        let filteredProducts = this.currentCategory === 'all' 
            ? this.products 
            : this.products.filter(product => product.category === this.currentCategory);

        // When showing all, order by menu category sequence
        if (this.currentCategory === 'all') {
            const categoryOrder = [
                'pizzalar',
                'ayvalik-tostu',
                'soguk-sandvic',
                'tavuk-doner',
                'et-doner',
                'makarnalar',
                'manti',
                'hamburger',
                'kofte-spesiyel',
                'aperatifler',
                'bistro',
                'salata',
                'icecekler'
            ];
            const orderIndex = new Map(categoryOrder.map((c, i) => [c, i]));
            filteredProducts = [...filteredProducts].sort((a, b) => {
                const ai = orderIndex.has(a.category) ? orderIndex.get(a.category) : Number.MAX_SAFE_INTEGER;
                const bi = orderIndex.has(b.category) ? orderIndex.get(b.category) : Number.MAX_SAFE_INTEGER;
                return ai - bi;
            });
        }

        if (filteredProducts.length === 0) {
            const emptyText = {
                tr: 'Henüz ürün eklenmedi',
                en: 'No products yet',
                ru: 'Товары пока не добавлены',
                de: 'Noch keine Produkte',
                fr: 'Aucun produit pour le moment',
                ar: 'لا توجد منتجات بعد'
            };
            productsGrid.innerHTML = `<div class="no-products">${emptyText[this.currentLanguage] || emptyText.en}</div>`;
            return;
        }

        productsGrid.innerHTML = filteredProducts.map(product => {
            const translation = product.translations[this.currentLanguage] || product.translations['en'];
            // Localized ingredients for card preview
            const lang = this.currentLanguage || 'tr';
            let ingList = [];
            if (Array.isArray(product.ingredients)) {
                ingList = product.ingredients;
            } else if (product.ingredients && typeof product.ingredients === 'object') {
                ingList = product.ingredients[lang] || product.ingredients.tr || [];
            }
            const hideDescription = product.category === 'pizzalar' || product.category === 'ayvalik-tostu';
            const descriptionHtml = hideDescription ? '' : `<p class="product-description">${this.getDisplayDescription(product, translation)}</p>`;
            const ingredientsHtml = (Array.isArray(ingList) && ingList.length)
                ? `<div class="product-ingredients"><strong data-translate="ingredients">İçerikler</strong>: ${ingList.join(', ')}</div>`
                : '';
            return `
                <div class="product-card" data-category="${product.category}">
                    <img src="${product.image}" alt="${translation.name}" class="product-image" loading="lazy">
                    <div class="product-content">
                        <h3 class="product-name">${translation.name}</h3>
                        ${descriptionHtml}
                        ${ingredientsHtml}
                        <div class="product-footer">
                            <span class="product-price">₺${product.price}</span>
                            <button class="product-details-btn" data-product-id="${product.id}">
                                <i class="fas fa-shopping-cart"></i>
                                <span data-translate="product_details">Sipariş Ver</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Update translations for new elements
        this.updateTranslations();
    }

    // Theme System
    loadTheme() {
        const saved = localStorage.getItem('restaurant_theme');
        this.currentTheme = (saved === 'light' || saved === 'dark') ? saved : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        const cb = document.getElementById('themeToggle');
        if (cb) cb.checked = this.currentTheme === 'light';
    }

    toggleTheme(isLight) {
        this.currentTheme = isLight ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('restaurant_theme', this.currentTheme);
    }

    // Event Listeners
    setupEventListeners() {
        // Language modal
        const languageModal = document.getElementById('languageModal');
        const languageToggle = document.getElementById('languageToggle');
        const modalClose = document.querySelector('.modal-close');
        const languageBtns = document.querySelectorAll('.language-btn');

        if (languageToggle) {
            languageToggle.addEventListener('click', () => {
                if (languageModal) {
                    languageModal.classList.add('show');
                }
            });
        }

        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.hideLanguageModal();
            });
        }

        if (languageModal) {
            languageModal.addEventListener('click', (e) => {
                if (e.target === languageModal) {
                    this.hideLanguageModal();
                }
            });
        }

        languageBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.currentTarget.getAttribute('data-lang');
                if (this.isValidLanguage(lang)) {
                    this.currentLanguage = lang;
                    localStorage.setItem('restaurant_language', lang);
                    this.updateLanguage();
                    this.renderProducts();
                    this.hideLanguageModal();
                }
            });
        });

        // Category navigation
        const categoryBtns = document.querySelectorAll('.category-btn');
        const prevBtn = document.getElementById('prevCategory');
        const nextBtn = document.getElementById('nextCategory');
        const categoriesScroll = document.getElementById('categoriesScroll');

        categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.getAttribute('data-category');
                this.currentCategory = category;
                
                // Update active state
                categoryBtns.forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                this.renderProducts();
            });
        });

        // Category scroll navigation
        if (prevBtn && categoriesScroll) {
            prevBtn.addEventListener('click', () => {
                categoriesScroll.scrollBy({ left: -200, behavior: 'smooth' });
            });
        }

        if (nextBtn && categoriesScroll) {
            nextBtn.addEventListener('click', () => {
                categoriesScroll.scrollBy({ left: 200, behavior: 'smooth' });
            });
        }

        // Product details modal - Open modal instead of adding to cart
        document.addEventListener('click', (e) => {
            if (e.target.closest('.product-details-btn')) {
                const btn = e.target.closest('.product-details-btn');
                const productId = btn.getAttribute('data-product-id');
                this.showProductModal(productId);
            }
        });

        // QR Modal - open on QR image click
        const qrImg = document.querySelector('.qr-image');
        const qrModal = document.getElementById('qrModal');
        const qrModalClose = document.getElementById('qrModalClose');
        if (qrImg && qrModal) {
            qrImg.addEventListener('click', () => {
                const modalImg = document.getElementById('qrModalImg');
                if (modalImg) {
                    modalImg.src = qrImg.getAttribute('src') || './qr.png';
                    modalImg.alt = qrImg.getAttribute('alt') || 'QR';
                }
                qrModal.classList.add('show');
            });
            if (qrModalClose) {
                qrModalClose.addEventListener('click', () => qrModal.classList.remove('show'));
            }
            qrModal.addEventListener('click', (ev) => {
                if (ev.target === qrModal) {
                    qrModal.classList.remove('show');
                }
            });
        }

        // Add to cart
        document.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-cart-btn')) {
                const btn = e.target.closest('.add-to-cart-btn');
                const productId = btn.getAttribute('data-product-id');
                this.addToCart(productId);
            }
        });

            // WhatsApp order button
            const whatsappBtn = document.getElementById('whatsappOrderBtn');
            if (whatsappBtn) {
                whatsappBtn.addEventListener('click', () => {
                    this.sendWhatsAppOrder();
                });
            }

            // Hero Download button - PWA Install
            const heroInstallBtn = document.getElementById('heroInstallBtn');
            if (heroInstallBtn) {
                heroInstallBtn.addEventListener('click', () => {
                    if (this.deferredPrompt) {
                        this.deferredPrompt.prompt();
                        this.deferredPrompt.userChoice.then((choiceResult) => {
                            if (choiceResult.outcome === 'accepted') {
                                console.log('User accepted the install prompt');
                            }
                            this.deferredPrompt = null;
                        });
                    }
                });
            }

            // Logo click - Scroll to top
            const logo = document.querySelector('.logo');
            if (logo) {
                logo.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            }

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('change', (e) => {
                this.toggleTheme(e.currentTarget.checked);
            });
        }

        // CTA button
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', () => {
                document.querySelector('.products').scrollIntoView({ behavior: 'smooth' });
            });
        }

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (header) {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        });

        // Product modal close
        const productModal = document.getElementById('productModal');
        const productModalClose = document.getElementById('productModalClose');
        
        if (productModalClose) {
            productModalClose.addEventListener('click', () => {
                this.hideProductModal();
            });
        }

        if (productModal) {
            productModal.addEventListener('click', (e) => {
                if (e.target === productModal) {
                    this.hideProductModal();
                }
            });
        }

        // Modal içindeki Sipariş Ver butonu
        const productModalOrderBtn = document.getElementById('productModalOrderBtn');
        if (productModalOrderBtn) {
            productModalOrderBtn.addEventListener('click', () => {
                if (this.currentProduct) {
                    this.addToCart(this.currentProduct.id);
                    this.hideProductModal();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideLanguageModal();
                this.hideProductModal();
            }
        });

        // Touch gestures for mobile
        let startX = 0;
        let startY = 0;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;

            // Horizontal swipe
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next category
                    if (nextBtn) nextBtn.click();
                } else {
                    // Swipe right - previous category
                    if (prevBtn) prevBtn.click();
                }
            }

            startX = 0;
            startY = 0;
        });
    }

    showProductModal(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const translation = product.translations[this.currentLanguage] || product.translations['en'];
        const modal = document.getElementById('productModal');
        
        if (!modal) return;

        // Update modal content
        document.getElementById('productModalImg').src = product.image;
        document.getElementById('productModalImg').alt = translation.name;
        document.getElementById('productModalName').textContent = translation.name;
		document.getElementById('productModalDescription').textContent = this.getDisplayDescription(product, translation);
        document.getElementById('productModalPrice').textContent = `₺${product.price}`;
        this.currentProduct = product;
        this.currentSelections = { extras: {}, removedIngredients: new Set() };
        this.renderExtrasAndIngredients();
        this.updateTotalPrice();

        // Show modal
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    hideProductModal() {
        const modal = document.getElementById('productModal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    // Render extras (radio/checkbox) and removable ingredients
    renderExtrasAndIngredients() {
        const t = this.getTranslations()[this.currentLanguage];
        const container = document.querySelector('.product-modal-info');
        if (!container || !this.currentProduct) return;

        // Remove old dynamic blocks if exist
        const oldExtras = container.querySelector('.extras-groups');
        if (oldExtras) oldExtras.remove();
        const oldIngredients = container.querySelector('.ingredients-list');
        if (oldIngredients) oldIngredients.remove();
        const oldTotal = container.querySelector('.modal-total');
        if (oldTotal) oldTotal.remove();

        const frag = document.createDocumentFragment();

        // Ingredients (removable)
        if (Array.isArray(this.currentProduct.ingredients)) {
            const ingWrap = document.createElement('div');
            ingWrap.className = 'ingredients-list';
            const title = document.createElement('h4');
            title.textContent = t.ingredients;
            ingWrap.appendChild(title);

            const list = document.createElement('div');
            list.className = 'chips';
            this.currentProduct.ingredients.forEach((ing) => {
                const chip = document.createElement('label');
                chip.className = 'chip removable';
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.checked = true; // default included
                input.addEventListener('change', () => {
                    if (input.checked) {
                        this.currentSelections.removedIngredients.delete(ing);
                    } else {
                        this.currentSelections.removedIngredients.add(ing);
                    }
                });
                const span = document.createElement('span');
                span.textContent = this.translateIngredient(ing, this.currentLanguage);
                chip.appendChild(input);
                chip.appendChild(span);
                list.appendChild(chip);
            });
            ingWrap.appendChild(list);
            frag.appendChild(ingWrap);
        }

        // Extras
        if (Array.isArray(this.currentProduct.extras)) {
            const extrasWrap = document.createElement('div');
            extrasWrap.className = 'extras-groups';
            const title = document.createElement('h4');
            title.textContent = t.extras;
            extrasWrap.appendChild(title);

            this.currentProduct.extras.forEach((group, groupIdx) => {
                const groupBlock = document.createElement('div');
                groupBlock.className = 'extra-group';
                const groupTitle = document.createElement('h5');
                const groupLabelRaw = (group.translations && group.translations[this.currentLanguage]) || group.name || '';
                groupTitle.textContent = this.normalizeLabel(groupLabelRaw);
                groupBlock.appendChild(groupTitle);

                const type = group.type === 'radio' ? 'radio' : 'checkbox';
                const optionsWrap = document.createElement('div');
                optionsWrap.className = 'extra-options';

                group.options.forEach((opt, optIdx) => {
                    const label = document.createElement('label');
                    label.className = 'option-row';
                    const input = document.createElement('input');
                    input.type = type;
                    input.name = `extra_${groupIdx}`;
                    input.value = opt.id ?? `${groupIdx}_${optIdx}`;
                    const priceDelta = Number(opt.priceDelta || 0);
                    input.addEventListener('change', () => {
                        if (type === 'radio') {
                            this.currentSelections.extras[groupIdx] = [input.value];
                        } else {
                            const current = new Set(this.currentSelections.extras[groupIdx] || []);
                            if (input.checked) current.add(input.value); else current.delete(input.value);
                            this.currentSelections.extras[groupIdx] = Array.from(current);
                        }
                        this.updateTotalPrice();
                    });

                    const optLabelRaw = (opt.translations && opt.translations[this.currentLanguage]) || opt.name || '';
                    const spanText = document.createElement('span');
                    spanText.textContent = this.normalizeLabel(optLabelRaw);
                    const spanPrice = document.createElement('span');
                    spanPrice.className = 'option-price';
                    if (priceDelta) spanPrice.textContent = `+₺${priceDelta}`;
                    label.appendChild(input);
                    label.appendChild(spanText);
                    label.appendChild(spanPrice);
                    optionsWrap.appendChild(label);
                });

                groupBlock.appendChild(optionsWrap);
                extrasWrap.appendChild(groupBlock);
            });

            frag.appendChild(extrasWrap);
        }

        // Total
        const totalRow = document.createElement('div');
        totalRow.className = 'modal-total';
        const totalLabel = document.createElement('span');
        totalLabel.textContent = t.total;
        const totalValue = document.createElement('strong');
        totalValue.id = 'modalTotalPrice';
        totalRow.appendChild(totalLabel);
        totalRow.appendChild(totalValue);
        frag.appendChild(totalRow);

        container.appendChild(frag);
    }

    // Compute price with selected extras
    updateTotalPrice() {
        if (!this.currentProduct) return;
        let total = Number(this.currentProduct.price || 0);
        if (Array.isArray(this.currentProduct.extras)) {
            this.currentProduct.extras.forEach((group, groupIdx) => {
                const selected = this.currentSelections.extras[groupIdx] || [];
                if (!Array.isArray(group.options)) return;
                group.options.forEach((opt, idx) => {
                    const id = opt.id ?? `${groupIdx}_${idx}`;
                    if (selected.includes(String(id))) {
                        total += Number(opt.priceDelta || 0);
                    }
                });
            });
        }
        const el = document.getElementById('modalTotalPrice');
        if (el) el.textContent = `₺${total.toFixed(2)}`;
        const basePriceEl = document.getElementById('productModalPrice');
        if (basePriceEl) basePriceEl.textContent = `₺${Number(this.currentProduct.price || 0).toFixed(2)}`;
    }

    // Cart System
    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const translation = product.translations[this.currentLanguage] || product.translations['en'];
        
        const cartItem = {
            id: productId,
            name: translation.name,
            description: translation.description,
            price: product.price,
            quantity: 1,
            extras: this.currentSelections.extras || {},
            removedIngredients: Array.from(this.currentSelections.removedIngredients || new Set())
        };

        // Check if item already exists in cart
        const existingItemIndex = this.cartItems.findIndex(item => 
            item.id === productId && 
            JSON.stringify(item.extras) === JSON.stringify(cartItem.extras) &&
            JSON.stringify(item.removedIngredients) === JSON.stringify(cartItem.removedIngredients)
        );

        if (existingItemIndex > -1) {
            this.cartItems[existingItemIndex].quantity += 1;
        } else {
            this.cartItems.push(cartItem);
        }

        this.updateWhatsAppButton();
        this.showCartFeedback();
    }

    updateWhatsAppButton() {
        const whatsappBtn = document.getElementById('whatsappOrderBtn');
        const cartBadge = document.getElementById('cartBadge');
        
        if (whatsappBtn && cartBadge) {
            const totalItems = this.cartItems.reduce((total, item) => total + item.quantity, 0);
            
            // WhatsApp butonunu her zaman göster
            whatsappBtn.style.display = 'flex';
            
            if (totalItems > 0) {
                cartBadge.style.display = 'flex';
                cartBadge.textContent = totalItems;
            } else {
                cartBadge.style.display = 'none';
            }
        }
    }

    showCartFeedback() {
        // Simple feedback - you can enhance this with animations
        const btn = event.target.closest('.add-to-cart-btn');
        if (btn) {
            const originalText = btn.querySelector('span').textContent;
            btn.querySelector('span').textContent = 'Eklendi!';
            btn.style.background = 'var(--color-success)';
            
            setTimeout(() => {
                btn.querySelector('span').textContent = originalText;
                btn.style.background = '';
            }, 1500);
        }
    }

    sendWhatsAppOrder() {
        const message = 'Merhaba Yicem, sipariş vermek istiyorum';
        const phoneNumber = '905412429007';
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
    }

    // PWA Service Worker Registration
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }

    // PWA Install Prompt
    setupInstallPrompt() {
        this.deferredPrompt = null;
        const installBtn = document.getElementById('installBtn');
        const heroInstallBtn = document.getElementById('heroInstallBtn');

        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later
            this.deferredPrompt = e;
            // Show the install buttons
            if (installBtn) {
                installBtn.style.display = 'flex';
            }
            if (heroInstallBtn) {
                heroInstallBtn.style.display = 'flex';
            }
        });

        if (installBtn) {
            installBtn.addEventListener('click', async () => {
                if (this.deferredPrompt) {
                    // Show the install prompt
                    this.deferredPrompt.prompt();
                    // Wait for the user to respond to the prompt
                    const { outcome } = await this.deferredPrompt.userChoice;
                    console.log(`User response to the install prompt: ${outcome}`);
                    // We no longer need the prompt. Clear it up.
                    this.deferredPrompt = null;
                    // Hide the install button
                    installBtn.style.display = 'none';
                }
            });
        }

        window.addEventListener('appinstalled', (evt) => {
            console.log('PWA was installed');
            if (installBtn) {
                installBtn.style.display = 'none';
            }
            if (heroInstallBtn) {
                heroInstallBtn.style.display = 'none';
            }
        });
    }

    // Translate ingredients function
    translateIngredient(ingredient, language) {
        const translations = {
            tr: {
                'Mozzarella': 'Mozzarella',
                'Domates Sosu': 'Domates Sosu',
                'Fesleğen': 'Fesleğen',
                'Cherry Domates': 'Cherry Domates',
                'Sucuk': 'Sucuk',
                'Mantar': 'Mantar',
                'Zeytin': 'Zeytin',
                'Pepperoni': 'Pepperoni',
                'Peynir': 'Peynir',
                'Tavuk': 'Tavuk',
                'Dana Eti': 'Dana Eti',
                'Soğan': 'Soğan',
                'Biber': 'Biber',
                'Marul': 'Marul',
                'Salatalık': 'Salatalık',
                'Domates': 'Domates',
                'Ekmek': 'Ekmek',
                'Tereyağı': 'Tereyağı',
                'Tuz': 'Tuz',
                'Karabiber': 'Karabiber',
                'Sarımsak': 'Sarımsak',
                'Maydanoz': 'Maydanoz',
                'Nane': 'Nane',
                'Yoğurt': 'Yoğurt',
                'Pilav': 'Pilav',
                'Makarna': 'Makarna',
                'Hamur': 'Hamur',
                'Sos': 'Sos',
                'Baharat': 'Baharat',
                'Yağ': 'Yağ',
                'Yumurta': 'Yumurta',
                'Süt': 'Süt',
                'Krema': 'Krema',
                'Bal': 'Bal',
                'Şeker': 'Şeker',
                'Un': 'Un',
                'Patates': 'Patates',
                'Havuç': 'Havuç',
                'Lahana': 'Lahana',
                'Ispanak': 'Ispanak',
                'Patlıcan': 'Patlıcan',
                'Kabak': 'Kabak',
                'Mısır': 'Mısır',
                'Bezelye': 'Bezelye',
                'Fasulye': 'Fasulye',
                'Mercimek': 'Mercimek',
                'Nohut': 'Nohut',
                'Ceviz': 'Ceviz',
                'Fındık': 'Fındık',
                'Badem': 'Badem',
                'Antep Fıstığı': 'Antep Fıstığı',
                'Kuru Üzüm': 'Kuru Üzüm',
                'Hurma': 'Hurma',
                'İncir': 'İncir',
                'Elma': 'Elma',
                'Muz': 'Muz',
                'Portakal': 'Portakal',
                'Limon': 'Limon',
                'Çilek': 'Çilek',
                'Kiraz': 'Kiraz',
                'Üzüm': 'Üzüm',
                'Şeftali': 'Şeftali',
                'Armut': 'Armut',
                'Kivi': 'Kivi',
                'Ananas': 'Ananas',
                'Karpuz': 'Karpuz',
                'Kavun': 'Kavun',
                'Nar': 'Nar',
                'Avokado': 'Avokado',
                'Hindistan Cevizi': 'Hindistan Cevizi',
                'Zencefil': 'Zencefil',
                'Tarçın': 'Tarçın',
                'Vanilya': 'Vanilya',
                'Çikolata': 'Çikolata',
                'Kakao': 'Kakao',
                'Kahve': 'Kahve',
                'Çay': 'Çay'
            },
            en: {
                'Mozzarella': 'Mozzarella',
                'Domates Sosu': 'Tomato Sauce',
                'Fesleğen': 'Basil',
                'Cherry Domates': 'Cherry Tomatoes',
                'Sucuk': 'Sausage',
                'Mantar': 'Mushroom',
                'Zeytin': 'Olive',
                'Pepperoni': 'Pepperoni',
                'Peynir': 'Cheese',
                'Tavuk': 'Chicken',
                'Dana Eti': 'Beef',
                'Soğan': 'Onion',
                'Biber': 'Pepper',
                'Marul': 'Lettuce',
                'Salatalık': 'Cucumber',
                'Domates': 'Tomato',
                'Ekmek': 'Bread',
                'Tereyağı': 'Butter',
                'Tuz': 'Salt',
                'Karabiber': 'Black Pepper',
                'Sarımsak': 'Garlic',
                'Maydanoz': 'Parsley',
                'Nane': 'Mint',
                'Yoğurt': 'Yogurt',
                'Pilav': 'Rice',
                'Makarna': 'Pasta',
                'Hamur': 'Dough',
                'Sos': 'Sauce',
                'Baharat': 'Spice',
                'Yağ': 'Oil',
                'Yumurta': 'Egg',
                'Süt': 'Milk',
                'Krema': 'Cream',
                'Bal': 'Honey',
                'Şeker': 'Sugar',
                'Un': 'Flour',
                'Patates': 'Potato',
                'Havuç': 'Carrot',
                'Lahana': 'Cabbage',
                'Ispanak': 'Spinach',
                'Patlıcan': 'Eggplant',
                'Kabak': 'Zucchini',
                'Mısır': 'Corn',
                'Bezelye': 'Peas',
                'Fasulye': 'Beans',
                'Mercimek': 'Lentil',
                'Nohut': 'Chickpea',
                'Ceviz': 'Walnut',
                'Fındık': 'Hazelnut',
                'Badem': 'Almond',
                'Antep Fıstığı': 'Pistachio',
                'Kuru Üzüm': 'Raisin',
                'Hurma': 'Date',
                'İncir': 'Fig',
                'Elma': 'Apple',
                'Muz': 'Banana',
                'Portakal': 'Orange',
                'Limon': 'Lemon',
                'Çilek': 'Strawberry',
                'Kiraz': 'Cherry',
                'Üzüm': 'Grape',
                'Şeftali': 'Peach',
                'Armut': 'Pear',
                'Kivi': 'Kiwi',
                'Ananas': 'Pineapple',
                'Karpuz': 'Watermelon',
                'Kavun': 'Melon',
                'Nar': 'Pomegranate',
                'Avokado': 'Avocado',
                'Hindistan Cevizi': 'Coconut',
                'Zencefil': 'Ginger',
                'Tarçın': 'Cinnamon',
                'Vanilya': 'Vanilla',
                'Çikolata': 'Chocolate',
                'Kakao': 'Cocoa',
                'Kahve': 'Coffee',
                'Çay': 'Tea'
            },
            ru: {
                'Mozzarella': 'Моцарелла',
                'Domates Sosu': 'Томатный соус',
                'Fesleğen': 'Базилик',
                'Cherry Domates': 'Помидоры черри',
                'Sucuk': 'Колбаса',
                'Mantar': 'Грибы',
                'Zeytin': 'Оливки',
                'Pepperoni': 'Пепперони',
                'Peynir': 'Сыр',
                'Tavuk': 'Курица',
                'Dana Eti': 'Говядина',
                'Soğan': 'Лук',
                'Biber': 'Перец',
                'Marul': 'Салат',
                'Salatalık': 'Огурец',
                'Domates': 'Помидор',
                'Ekmek': 'Хлеб',
                'Tereyağı': 'Масло',
                'Tuz': 'Соль',
                'Karabiber': 'Черный перец',
                'Sarımsak': 'Чеснок',
                'Maydanoz': 'Петрушка',
                'Nane': 'Мята',
                'Yoğurt': 'Йогурт',
                'Pilav': 'Рис',
                'Makarna': 'Макароны',
                'Hamur': 'Тесто',
                'Sos': 'Соус',
                'Baharat': 'Специи',
                'Yağ': 'Масло',
                'Yumurta': 'Яйцо',
                'Süt': 'Молоко',
                'Krema': 'Сливки',
                'Bal': 'Мед',
                'Şeker': 'Сахар',
                'Un': 'Мука',
                'Patates': 'Картофель',
                'Havuç': 'Морковь',
                'Lahana': 'Капуста',
                'Ispanak': 'Шпинат',
                'Patlıcan': 'Баклажан',
                'Kabak': 'Кабачок',
                'Mısır': 'Кукуруза',
                'Bezelye': 'Горох',
                'Fasulye': 'Фасоль',
                'Mercimek': 'Чечевица',
                'Nohut': 'Нут',
                'Ceviz': 'Грецкий орех',
                'Fındık': 'Фундук',
                'Badem': 'Миндаль',
                'Antep Fıstığı': 'Фисташки',
                'Kuru Üzüm': 'Изюм',
                'Hurma': 'Финик',
                'İncir': 'Инжир',
                'Elma': 'Яблоко',
                'Muz': 'Банан',
                'Portakal': 'Апельсин',
                'Limon': 'Лимон',
                'Çilek': 'Клубника',
                'Kiraz': 'Вишня',
                'Üzüm': 'Виноград',
                'Şeftali': 'Персик',
                'Armut': 'Груша',
                'Kivi': 'Киви',
                'Ananas': 'Ананас',
                'Karpuz': 'Арбуз',
                'Kavun': 'Дыня',
                'Nar': 'Гранат',
                'Avokado': 'Авокадо',
                'Hindistan Cevizi': 'Кокос',
                'Zencefil': 'Имбирь',
                'Tarçın': 'Корица',
                'Vanilya': 'Ваниль',
                'Çikolata': 'Шоколад',
                'Kakao': 'Какао',
                'Kahve': 'Кофе',
                'Çay': 'Чай'
            },
            de: {
                'Mozzarella': 'Mozzarella',
                'Domates Sosu': 'Tomatensauce',
                'Fesleğen': 'Basilikum',
                'Cherry Domates': 'Kirschtomaten',
                'Sucuk': 'Wurst',
                'Mantar': 'Pilz',
                'Zeytin': 'Olive',
                'Pepperoni': 'Pepperoni',
                'Peynir': 'Käse',
                'Tavuk': 'Hähnchen',
                'Dana Eti': 'Rindfleisch',
                'Soğan': 'Zwiebel',
                'Biber': 'Pfeffer',
                'Marul': 'Salat',
                'Salatalık': 'Gurke',
                'Domates': 'Tomate',
                'Ekmek': 'Brot',
                'Tereyağı': 'Butter',
                'Tuz': 'Salz',
                'Karabiber': 'Schwarzer Pfeffer',
                'Sarımsak': 'Knoblauch',
                'Maydanoz': 'Petersilie',
                'Nane': 'Minze',
                'Yoğurt': 'Joghurt',
                'Pilav': 'Reis',
                'Makarna': 'Pasta',
                'Hamur': 'Teig',
                'Sos': 'Soße',
                'Baharat': 'Gewürz',
                'Yağ': 'Öl',
                'Yumurta': 'Ei',
                'Süt': 'Milch',
                'Krema': 'Sahne',
                'Bal': 'Honig',
                'Şeker': 'Zucker',
                'Un': 'Mehl',
                'Patates': 'Kartoffel',
                'Havuç': 'Karotte',
                'Lahana': 'Kohl',
                'Ispanak': 'Spinat',
                'Patlıcan': 'Aubergine',
                'Kabak': 'Zucchini',
                'Mısır': 'Mais',
                'Bezelye': 'Erbsen',
                'Fasulye': 'Bohnen',
                'Mercimek': 'Linsen',
                'Nohut': 'Kichererbsen',
                'Ceviz': 'Walnuss',
                'Fındık': 'Haselnuss',
                'Badem': 'Mandel',
                'Antep Fıstığı': 'Pistazie',
                'Kuru Üzüm': 'Rosine',
                'Hurma': 'Dattel',
                'İncir': 'Feige',
                'Elma': 'Apfel',
                'Muz': 'Banane',
                'Portakal': 'Orange',
                'Limon': 'Zitrone',
                'Çilek': 'Erdbeere',
                'Kiraz': 'Kirsche',
                'Üzüm': 'Traube',
                'Şeftali': 'Pfirsich',
                'Armut': 'Birne',
                'Kivi': 'Kiwi',
                'Ananas': 'Ananas',
                'Karpuz': 'Wassermelone',
                'Kavun': 'Melone',
                'Nar': 'Granatapfel',
                'Avokado': 'Avocado',
                'Hindistan Cevizi': 'Kokosnuss',
                'Zencefil': 'Ingwer',
                'Tarçın': 'Zimt',
                'Vanilya': 'Vanille',
                'Çikolata': 'Schokolade',
                'Kakao': 'Kakao',
                'Kahve': 'Kaffee',
                'Çay': 'Tee'
            },
            fr: {
                'Mozzarella': 'Mozzarella',
                'Domates Sosu': 'Sauce tomate',
                'Fesleğen': 'Basilic',
                'Cherry Domates': 'Tomates cerises',
                'Sucuk': 'Saucisse',
                'Mantar': 'Champignon',
                'Zeytin': 'Olive',
                'Pepperoni': 'Pepperoni',
                'Peynir': 'Fromage',
                'Tavuk': 'Poulet',
                'Dana Eti': 'Bœuf',
                'Soğan': 'Oignon',
                'Biber': 'Poivre',
                'Marul': 'Laitue',
                'Salatalık': 'Concombre',
                'Domates': 'Tomate',
                'Ekmek': 'Pain',
                'Tereyağı': 'Beurre',
                'Tuz': 'Sel',
                'Karabiber': 'Poivre noir',
                'Sarımsak': 'Ail',
                'Maydanoz': 'Persil',
                'Nane': 'Menthe',
                'Yoğurt': 'Yaourt',
                'Pilav': 'Riz',
                'Makarna': 'Pâtes',
                'Hamur': 'Pâte',
                'Sos': 'Sauce',
                'Baharat': 'Épice',
                'Yağ': 'Huile',
                'Yumurta': 'Œuf',
                'Süt': 'Lait',
                'Krema': 'Crème',
                'Bal': 'Miel',
                'Şeker': 'Sucre',
                'Un': 'Farine',
                'Patates': 'Pomme de terre',
                'Havuç': 'Carotte',
                'Lahana': 'Chou',
                'Ispanak': 'Épinard',
                'Patlıcan': 'Aubergine',
                'Kabak': 'Courgette',
                'Mısır': 'Maïs',
                'Bezelye': 'Pois',
                'Fasulye': 'Haricots',
                'Mercimek': 'Lentille',
                'Nohut': 'Pois chiche',
                'Ceviz': 'Noix',
                'Fındık': 'Noisette',
                'Badem': 'Amande',
                'Antep Fıstığı': 'Pistache',
                'Kuru Üzüm': 'Raisin sec',
                'Hurma': 'Datte',
                'İncir': 'Figue',
                'Elma': 'Pomme',
                'Muz': 'Banane',
                'Portakal': 'Orange',
                'Limon': 'Citron',
                'Çilek': 'Fraise',
                'Kiraz': 'Cerise',
                'Üzüm': 'Raisin',
                'Şeftali': 'Pêche',
                'Armut': 'Poire',
                'Kivi': 'Kiwi',
                'Ananas': 'Ananas',
                'Karpuz': 'Pastèque',
                'Kavun': 'Melon',
                'Nar': 'Grenade',
                'Avokado': 'Avocat',
                'Hindistan Cevizi': 'Noix de coco',
                'Zencefil': 'Gingembre',
                'Tarçın': 'Cannelle',
                'Vanilya': 'Vanille',
                'Çikolata': 'Chocolat',
                'Kakao': 'Cacao',
                'Kahve': 'Café',
                'Çay': 'Thé'
            },
            ar: {
                'Mozzarella': 'موزاريلا',
                'Domates Sosu': 'صلصة الطماطم',
                'Fesleğen': 'الريحان',
                'Cherry Domates': 'طماطم كرزية',
                'Sucuk': 'النقانق',
                'Mantar': 'الفطر',
                'Zeytin': 'الزيتون',
                'Pepperoni': 'بيبروني',
                'Peynir': 'الجبن',
                'Tavuk': 'الدجاج',
                'Dana Eti': 'لحم البقر',
                'Soğan': 'البصل',
                'Biber': 'الفلفل',
                'Marul': 'الخس',
                'Salatalık': 'الخيار',
                'Domates': 'الطماطم',
                'Ekmek': 'الخبز',
                'Tereyağı': 'الزبدة',
                'Tuz': 'الملح',
                'Karabiber': 'الفلفل الأسود',
                'Sarımsak': 'الثوم',
                'Maydanoz': 'البقدونس',
                'Nane': 'النعناع',
                'Yoğurt': 'الزبادي',
                'Pilav': 'الأرز',
                'Makarna': 'المعكرونة',
                'Hamur': 'العجين',
                'Sos': 'الصلصة',
                'Baharat': 'التوابل',
                'Yağ': 'الزيت',
                'Yumurta': 'البيض',
                'Süt': 'الحليب',
                'Krema': 'الكريمة',
                'Bal': 'العسل',
                'Şeker': 'السكر',
                'Un': 'الدقيق',
                'Patates': 'البطاطس',
                'Havuç': 'الجزر',
                'Lahana': 'الملفوف',
                'Ispanak': 'السبانخ',
                'Patlıcan': 'الباذنجان',
                'Kabak': 'الكوسة',
                'Mısır': 'الذرة',
                'Bezelye': 'البازلاء',
                'Fasulye': 'الفاصوليا',
                'Mercimek': 'العدس',
                'Nohut': 'الحمص',
                'Ceviz': 'الجوز',
                'Fındık': 'البندق',
                'Badem': 'اللوز',
                'Antep Fıstığı': 'الفستق',
                'Kuru Üzüm': 'الزبيب',
                'Hurma': 'التمر',
                'İncir': 'التين',
                'Elma': 'التفاح',
                'Muz': 'الموز',
                'Portakal': 'البرتقال',
                'Limon': 'الليمون',
                'Çilek': 'الفراولة',
                'Kiraz': 'الكرز',
                'Üzüm': 'العنب',
                'Şeftali': 'الخوخ',
                'Armut': 'الكمثرى',
                'Kivi': 'الكيوي',
                'Ananas': 'الأناناس',
                'Karpuz': 'البطيخ',
                'Kavun': 'الشمام',
                'Nar': 'الرمان',
                'Avokado': 'الأفوكادو',
                'Hindistan Cevizi': 'جوز الهند',
                'Zencefil': 'الزنجبيل',
                'Tarçın': 'القرفة',
                'Vanilya': 'الفانيليا',
                'Çikolata': 'الشوكولاتة',
                'Kakao': 'الكاكاو',
                'Kahve': 'القهوة',
                'Çay': 'الشاي'
            }
        };

        return translations[language]?.[ingredient] || ingredient;
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .no-products {
        grid-column: 1 / -1;
        text-align: center;
        padding: var(--spacing-xxl);
        color: var(--color-text-secondary);
        font-size: var(--font-size-lg);
    }
`;
document.head.appendChild(style);

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.restaurantApp = new RestaurantApp();
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
