document.addEventListener("DOMContentLoaded", async () => {
  const ayahHTML = document.getElementById("h1");
  let surah = document.getElementById("surahName");
  let endOfAyah = document.getElementById("endOfAyah");
  let verse_key;
  const refreshBtn = document.getElementById("refresh");
  const copyBtn = document.getElementById("copy");
  await fetchAyah();
  fetchTafseer();
  fetchTranslation();

  async function fetchAyah() {
    ayahHTML.classList.add("skeleton");
    document.getElementById("translation-text").classList.add("skeleton");
    document.getElementById("translation-text-dummy").classList.add("skeleton");
    document.getElementById("tafseer-text").classList.add("skeleton");
    document.getElementById("tafseer-text-dummy").classList.add("skeleton");
    while (true) {
      try {
        const randomRes = await fetch(
          "https://api.quran.com/api/v4/verses/random?words=true"
        );
        console.log(randomRes);
        const randomData = await randomRes.json();
        console.log(randomData);
        if (randomData.verse.words.length > 16) {
          continue;
        }
        verse_key = randomData.verse.verse_key;

        //Because of rendering issues, i had to do this, sorry for hurting your eyes...
        const arabicNumerals = new Map([
          ["1", "١"],
          ["2", "٢"],
          ["3", "٣"],
          ["4", "٤"],
          ["5", "٥"],
          ["6", "٦"],
          ["7", "٧"],
          ["8", "٨"],
          ["9", "٩"],
          ["10", "١٠"],
          ["11", "١١"],
          ["12", "١٢"],
          ["13", "١٣"],
          ["14", "١٤"],
          ["15", "١٥"],
          ["16", "١٦"],
          ["17", "١٧"],
          ["18", "١٨"],
          ["19", "١٩"],
          ["20", "٢٠"],
          ["21", "٢١"],
          ["22", "٢٢"],
          ["23", "٢٣"],
          ["24", "٢٤"],
          ["25", "٢٥"],
          ["26", "٢٦"],
          ["27", "٢٧"],
          ["28", "٢٨"],
          ["29", "٢٩"],
          ["30", "٣٠"],
          ["31", "٣١"],
          ["32", "٣٢"],
          ["33", "٣٣"],
          ["34", "٣٤"],
          ["35", "٣٥"],
          ["36", "٣٦"],
          ["37", "٣٧"],
          ["38", "٣٨"],
          ["39", "٣٩"],
          ["40", "٤٠"],
          ["41", "٤١"],
          ["42", "٤٢"],
          ["43", "٤٣"],
          ["44", "٤٤"],
          ["45", "٤٥"],
          ["46", "٤٦"],
          ["47", "٤٧"],
          ["48", "٤٨"],
          ["49", "٤٩"],
          ["50", "٥٠"],
          ["51", "٥١"],
          ["52", "٥٢"],
          ["53", "٥٣"],
          ["54", "٥٤"],
          ["55", "٥٥"],
          ["56", "٥٦"],
          ["57", "٥٧"],
          ["58", "٥٨"],
          ["59", "٥٩"],
          ["60", "٦٠"],
          ["61", "٦١"],
          ["62", "٦٢"],
          ["63", "٦٣"],
          ["64", "٦٤"],
          ["65", "٦٥"],
          ["66", "٦٦"],
          ["67", "٦٧"],
          ["68", "٦٨"],
          ["69", "٦٩"],
          ["70", "٧٠"],
          ["71", "٧١"],
          ["72", "٧٢"],
          ["73", "٧٣"],
          ["74", "٧٤"],
          ["75", "٧٥"],
          ["76", "٧٦"],
          ["77", "٧٧"],
          ["78", "٧٨"],
          ["79", "٧٩"],
          ["80", "٨٠"],
          ["81", "٨١"],
          ["82", "٨٢"],
          ["83", "٨٣"],
          ["84", "٨٤"],
          ["85", "٨٥"],
          ["86", "٨٦"],
          ["87", "٨٧"],
          ["88", "٨٨"],
          ["89", "٨٩"],
          ["90", "٩٠"],
          ["91", "٩١"],
          ["92", "٩٢"],
          ["93", "٩٣"],
          ["94", "٩٤"],
          ["95", "٩٥"],
          ["96", "٩٦"],
          ["97", "٩٧"],
          ["98", "٩٨"],
          ["99", "٩٩"],
          ["100", "١٠٠"],
          ["101", "١٠١"],
          ["102", "١٠٢"],
          ["103", "١٠٣"],
          ["104", "١٠٤"],
          ["105", "١٠٥"],
          ["106", "١٠٦"],
          ["107", "١٠٧"],
          ["108", "١٠٨"],
          ["109", "١٠٩"],
          ["110", "١١٠"],
          ["111", "١١١"],
          ["112", "١١٢"],
          ["113", "١١٣"],
          ["114", "١١٤"],
          ["115", "١١٥"],
          ["116", "١١٦"],
          ["117", "١١٧"],
          ["118", "١١٨"],
          ["119", "١١٩"],
          ["120", "١٢٠"],
          ["121", "١٢١"],
          ["122", "١٢٢"],
          ["123", "١٢٣"],
          ["124", "١٢٤"],
          ["125", "١٢٥"],
          ["126", "١٢٦"],
          ["127", "١٢٧"],
          ["128", "١٢٨"],
          ["129", "١٢٩"],
          ["130", "١٣٠"],
          ["131", "١٣١"],
          ["132", "١٣٢"],
          ["133", "١٣٣"],
          ["134", "١٣٤"],
          ["135", "١٣٥"],
          ["136", "١٣٦"],
          ["137", "١٣٧"],
          ["138", "١٣٨"],
          ["139", "١٣٩"],
          ["140", "١٤٠"],
          ["141", "١٤١"],
          ["142", "١٤٢"],
          ["143", "١٤٣"],
          ["144", "١٤٤"],
          ["145", "١٤٥"],
          ["146", "١٤٦"],
          ["147", "١٤٧"],
          ["148", "١٤٨"],
          ["149", "١٤٩"],
          ["150", "١٥٠"],
          ["151", "١٥١"],
          ["152", "١٥٢"],
          ["153", "١٥٣"],
          ["154", "١٥٤"],
          ["155", "١٥٥"],
          ["156", "١٥٦"],
          ["157", "١٥٧"],
          ["158", "١٥٨"],
          ["159", "١٥٩"],
          ["160", "١٦٠"],
          ["161", "١٦١"],
          ["162", "١٦٢"],
          ["163", "١٦٣"],
          ["164", "١٦٤"],
          ["165", "١٦٥"],
          ["166", "١٦٦"],
          ["167", "١٦٧"],
          ["168", "١٦٨"],
          ["169", "١٦٩"],
          ["170", "١٧٠"],
          ["171", "١٧١"],
          ["172", "١٧٢"],
          ["173", "١٧٣"],
          ["174", "١٧٤"],
          ["175", "١٧٥"],
          ["176", "١٧٦"],
          ["177", "١٧٧"],
          ["178", "١٧٨"],
          ["179", "١٧٩"],
          ["180", "١٨٠"],
          ["181", "١٨١"],
          ["182", "١٨٢"],
          ["183", "١٨٣"],
          ["184", "١٨٤"],
          ["185", "١٨٥"],
          ["186", "١٨٦"],
          ["187", "١٨٧"],
          ["188", "١٨٨"],
          ["189", "١٨٩"],
          ["190", "١٩٠"],
          ["191", "١٩١"],
          ["192", "١٩٢"],
          ["193", "١٩٣"],
          ["194", "١٩٤"],
          ["195", "١٩٥"],
          ["196", "١٩٦"],
          ["197", "١٩٧"],
          ["198", "١٩٨"],
          ["199", "١٩٩"],
          ["200", "٢٠٠"],
          ["201", "٢٠١"],
          ["202", "٢٠٢"],
          ["203", "٢٠٣"],
          ["204", "٢٠٤"],
          ["205", "٢٠٥"],
          ["206", "٢٠٦"],
          ["207", "٢٠٧"],
          ["208", "٢٠٨"],
          ["209", "٢٠٩"],
          ["210", "٢١٠"],
          ["211", "٢١١"],
          ["212", "٢١٢"],
          ["213", "٢١٣"],
          ["214", "٢١٤"],
          ["215", "٢١٥"],
          ["216", "٢١٦"],
          ["217", "٢١٧"],
          ["218", "٢١٨"],
          ["219", "٢١٩"],
          ["220", "٢٢٠"],
          ["221", "٢٢١"],
          ["222", "٢٢٢"],
          ["223", "٢٢٣"],
          ["224", "٢٢٤"],
          ["225", "٢٢٥"],
          ["226", "٢٢٦"],
          ["227", "٢٢٧"],
          ["228", "٢٢٨"],
          ["229", "٢٢٩"],
          ["230", "٢٣٠"],
          ["231", "٢٣١"],
          ["232", "٢٣٢"],
          ["233", "٢٣٣"],
          ["234", "٢٣٤"],
          ["235", "٢٣٥"],
          ["236", "٢٣٦"],
          ["286", "٢٨٦"],
        ]);

        const surahs = new Map([
          ["1", "الفاتحة"],
          ["2", "البقرة"],
          ["3", "آل عمران"],
          ["4", "النساء"],
          ["5", "المائدة"],
          ["6", "الأنعام"],
          ["7", "الأعراف"],
          ["8", "الأنفال"],
          ["9", "التوبة"],
          ["10", "يونس"],
          ["11", "هود"],
          ["12", "يوسف"],
          ["13", "الرعد"],
          ["14", "إبراهيم"],
          ["15", "الحجر"],
          ["16", "النحل"],
          ["17", "الإسراء"],
          ["18", "الكهف"],
          ["19", "مريم"],
          ["20", "طه"],
          ["21", "الأنبياء"],
          ["22", "الحج"],
          ["23", "المؤمنون"],
          ["24", "النور"],
          ["25", "الفرقان"],
          ["26", "الشعراء"],
          ["27", "النمل"],
          ["28", "القصص"],
          ["29", "العنكبوت"],
          ["30", "الروم"],
          ["31", "لقمان"],
          ["32", "السجدة"],
          ["33", "الأحزاب"],
          ["34", "سبإ"],
          ["35", "فاطر"],
          ["36", "يس"],
          ["37", "الصافات"],
          ["38", "ص"],
          ["39", "الزمر"],
          ["40", "غافر"],
          ["41", "فصلت"],
          ["42", "الشورى"],
          ["43", "الزخرف"],
          ["44", "الدخان"],
          ["45", "الجاثية"],
          ["46", "الأحقاف"],
          ["47", "محمد"],
          ["48", "الفتح"],
          ["49", "الحجرات"],
          ["50", "ق"],
          ["51", "الذاريات"],
          ["52", "الطور"],
          ["53", "النجم"],
          ["54", "القمر"],
          ["55", "الرحمن"],
          ["56", "الواقعة"],
          ["57", "الحديد"],
          ["58", "المجادلة"],
          ["59", "الحشر"],
          ["60", "الممتحنة"],
          ["61", "الصف"],
          ["62", "الجمعة"],
          ["63", "المنافقون"],
          ["64", "التغابن"],
          ["65", "الطلاق"],
          ["66", "التحريم"],
          ["67", "الملك"],
          ["68", "القلم"],
          ["69", "الحاقة"],
          ["70", "المعارج"],
          ["71", "نوح"],
          ["72", "الجن"],
          ["73", "المزمل"],
          ["74", "المدثر"],
          ["75", "القيامة"],
          ["76", "الإنسان"],
          ["77", "المرسلات"],
          ["78", "النبأ"],
          ["79", "النازعات"],
          ["80", "عبس"],
          ["81", "التكوير"],
          ["82", "الإنفطار"],
          ["83", "المطففين"],
          ["84", "الإنشقاق"],
          ["85", "البروج"],
          ["86", "الطارق"],
          ["87", "الأعلى"],
          ["88", "الغاشية"],
          ["89", "الفجر"],
          ["90", "البلد"],
          ["91", "الشمس"],
          ["92", "الليل"],
          ["93", "الضحى"],
          ["94", "الشرح"],
          ["95", "التين"],
          ["96", "العلق"],
          ["97", "القدر"],
          ["98", "البينة"],
          ["99", "الزلزلة"],
          ["100", "العاديات"],
          ["101", "القارعة"],
          ["102", "التكاثر"],
          ["103", "العصر"],
          ["104", "الهمزة"],
          ["105", "الفيل"],
          ["106", "قريش"],
          ["107", "الماعون"],
          ["108", "الكوثر"],
          ["109", "الكافرون"],
          ["110", "النصر"],
          ["111", "المسد"],
          ["112", "الإخلاص"],
          ["113", "الفلق"],
          ["114", "الناس"],
        ]);

        let surahNumber = "";
        let AyahNumber = "";

        let ayahNumberConverted = "";
        [surahNumber, AyahNumber] = verse_key.split(":");

        console.log(verse_key);
        console.log("surah: ", surahNumber);
        console.log("ayah: ", AyahNumber);
        console.log(ayahNumberConverted);

        endOfAyah.innerHTML = arabicNumerals.get(AyahNumber);
        surah.innerHTML = surahs.get(surahNumber);

        const uthmaniRes = await fetch(
          `https://api.quran.com/api/v4/quran/verses/uthmani?verse_key=${verse_key}`
        );
        const uthmaniData = await uthmaniRes.json();
        const ayah = uthmaniData.verses[0].text_uthmani;
        ayahHTML.innerHTML = ayah;
        ayahHTML.classList.remove("skeleton");

        break;
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function fetchTranslation() {
    let translation_id = document.getElementById("lang").value;

    try {
      const translationRes = await fetch(
        `https://api.quran.com/api/v4/quran/translations/${Number(
          translation_id
        )}?verse_key=${verse_key}`
      );

      console.log(translationRes);

      const translationsData = await translationRes.json();
      console.log(translationsData);

      document.getElementById("translation-text").innerHTML =
        translationsData.translations[0].text;
      document.getElementById("translation-text").classList.remove("skeleton");
      document
        .getElementById("translation-text-dummy")
        .classList.remove("skeleton");
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchTafseer() {
    const tafseerRes = await fetch(
      `https://api.quran.com/api/v4/quran/tafsirs/93?verse_key=${verse_key}`
    );
    const tafseerData = await tafseerRes.json();
    console.log(tafseerData);
    // console.log(resource_id);
    console.log(document.getElementById("tafseer").value);

    document.getElementById("tafseer-text").classList.remove("skeleton");
    document.getElementById("tafseer-text-dummy").classList.remove("skeleton");

    document.getElementById("tafseer-text").innerHTML =
      tafseerData.tafsirs.find(
        (t) =>
          t.resource_id === Number(document.getElementById("tafseer").value)
      ).text;
  }

  async function fetchRecitation() {
    let recitation_id = Number(document.getElementById("recSelect").value);
    try {
      const recitationRes = await fetch(
        `https://api.quran.com/api/v4/recitations/${recitation_id}/by_ayah/${verse_key}`
      );
      const recitationData = await recitationRes.json();
      document.getElementById(
        "player"
      ).src = `https://verses.quran.com/${recitationData.audio_files[0].url}`;
      console.log(recitationData);
    } catch (err) {
      console.log(err);
    }
  }
  fetchRecitation();
  refreshBtn.addEventListener("click", async () => {
    await fetchAyah();
    fetchTranslation();
    fetchTafseer();
    fetchRecitation();
  });

  document.getElementById("lang").addEventListener("change", () => {
    fetchTranslation();
  });

  document.getElementById("tafseer").addEventListener("change", async () => {
    fetchTafseer();
  });

  document.getElementById("recSelect").addEventListener("change", () => {
    fetchRecitation();
  });
  async function copyToClipboard() {
    let copiedString = `﴾ ${ayahHTML.innerHTML} ﴿ \n\n ${surah.innerHTML} [${endOfAyah.innerHTML}]`;
    try {
      await navigator.clipboard.writeText(copiedString);
      copyBtn.classList.add("copied");
      setTimeout(() => {
        copyBtn.classList.remove("copied");
      }, 200);
    } catch (error) {
      console.log(error);
    }
  }
  copyBtn.addEventListener("click", () => {
    copyToClipboard();
  });
});
