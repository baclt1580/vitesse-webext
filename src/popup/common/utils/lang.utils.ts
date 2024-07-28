import langs from "langs-es";

let langMap = {
    "zh": "中文",          // 1.4 billion speakers
    "es": "西班牙语",      // 460 million speakers
    "en": "英语",          // 379 million speakers
    "hi": "印地语",        // 341 million speakers
    "ar": "阿拉伯语",      // 315 million speakers
    "bn": "孟加拉语",      // 228 million speakers
    "pt": "葡萄牙语",      // 221 million speakers
    "ru": "俄语",          // 154 million speakers
    "ja": "日语",          // 128 million speakers
    "pa": "旁遮普语",      // 125 million speakers
    "de": "德语",          // 76 million speakers
    "jv": "爪哇语",         // 82 million speakers
    "ko": "韩语",          // 77 million speakers
    "fr": "法语",          // 77 million speakers
    "te": "泰卢固语",      // 75 million speakers
    "mr": "马拉地语",      // 83 million speakers
    "tr": "土耳其语",      // 75 million speakers
    "ta": "泰米尔语",      // 70 million speakers
    "vi": "越南语",        // 68 million speakers
    "ur": "乌尔都语",      // 68 million speakers
    "it": "意大利语",      // 63 million speakers
    "th": "泰语",          // 60 million speakers
    "gu": "古吉拉特语",    // 56 million speakers
    "pl": "波兰语",        // 45 million speakers
    "uk": "乌克兰语",      // 30 million speakers
    "ro": "罗马尼亚语",    // 24 million speakers
    "nl": "荷兰语",        // 23 million speakers
    "el": "希腊语",        // 13 million speakers
    "sv": "瑞典语",        // 10 million speakers
    "hu": "匈牙利语",      // 13 million speakers
    "fi": "芬兰语",        // 5.4 million speakers
    "da": "丹麦语",        // 5.8 million speakers
    "no": "挪威语",        // 5.3 million speakers
    "he": "希伯来语",      // 9 million speakers
    "id": "印尼语",        // 43 million speakers
    "ms": "马来语",        // 20 million speakers
    "tl": "塔加拉族语（菲律宾语）" // 28 million speakers
};
export type langWithZh = {
    lang: Language;
    zh: string;
}
export const langList:langWithZh[] = Object.keys(langMap).map(key => {
    let lang = langs.all().find(item => item[1] == key) as Language;
    return {
        lang,
        zh: (langMap as any)[key] as string
    }
})

export function getZhLang(code: string) {
    return (langMap as any)[code] || null;
}

export function getLangWithZh(code:string){
    return langList.find(item=>{
       return item.lang[1]==code
    })
}
const iso6393ToIso6391: any = {
    'cmn': 'zh',  // 普通话
    'eng': 'en',  // 英语
    'spa': 'es',  // 西班牙语
    'ara': 'ar',  // 阿拉伯语
    'hin': 'hi',  // 印地语
    'ben': 'bn',  // 孟加拉语
    'por': 'pt',  // 葡萄牙语
    'rus': 'ru',  // 俄语
    'jpn': 'ja',  // 日语
    'deu': 'de',  // 德语
    'fra': 'fr',  // 法语
    'kor': 'ko',  // 韩语
    'vie': 'vi',  // 越南语
    'ita': 'it',  // 意大利语
    'tur': 'tr',  // 土耳其语
    'tam': 'ta',  // 泰米尔语
    'urd': 'ur',  // 乌尔都语
    'fas': 'fa',  // 波斯语
    'pol': 'pl',  // 波兰语
    'ukr': 'uk',  // 乌克兰语
    'ron': 'ro',  // 罗马尼亚语
    'nld': 'nl',  // 荷兰语
    'ell': 'el',  // 希腊语
    'swe': 'sv',  // 瑞典语
    'fin': 'fi',  // 芬兰语
    'hun': 'hu',  // 匈牙利语
    'tha': 'th',  // 泰语
    'heb': 'he',  // 希伯来语
    'ind': 'id',  // 印尼语
    'msa': 'ms',  // 马来语
    // 可以根据需要添加更多映射
};
export function getLangByl3(code: string) {
    let l1 = iso6393ToIso6391[code]
    let lang = langList.find(item => {
        return item.lang[1] == l1
    });
    return lang;
}