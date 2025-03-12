class SelectToReadefine {
  constructor() {
    this.remove = this.remove.bind(this);
  }

  appendToBody() {
    this.iframe = document.createElement('iframe');
    this.iframe.id = "hl2rdfn";
    this.iframe.src = '/Readefine/select-to-readefine/dist/index.html';
    this.iframe.style.border = 'none';
    document.body.appendChild(this.iframe);
  }

  remove() {
    let iframeElem = document.getElementById("hl2rdfn");
    if (iframeElem) {
      iframeElem.parentNode.removeChild(iframeElem);
    }
  }
}

class SelectToReadefineButton extends SelectToReadefine {
  constructor() {
    super();
  }
}

class SelectToReadefineDisabled extends SelectToReadefine {
  constructor() {
    super();
  }
}

class Readefine {
  constructor() {
    this.readefineLogoImage = "Readefine/testicon.png";
    this.checkTextItemsIsRunning = false;
    this.textItems = [];
    this.readefinitionsList = {};
    this.readefineMode = "";
    this.tooltip = null;
    this.instances = [];
    this.parser = new DOMParser();
    this.hoveredData = {};
    this.currsel = "";
    this.button = false;
    this.banner = false;
    this.status = true;
    this.handleCopy = this.handleCopy.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.getSelectedText = this.getSelectedText.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, this.acceptNode);

    this.clipboardCandidates = {};
    this.copyTimeout = null;

    this.SELECTION_CHANGE_TIMEOUT = 200;
    this.MAX_TEXT_LENGTH = 1000;

    this.sourceData = {
      "original": [
        "Turn confusing jargon into simple English, or just give the internet a fresh spin.",
        "Turn complex language into simple English, or just give the web a fresh spin."
      ],
      "reword": {
        "a pirate": [
          "Transform befuddlin' gibberish into plain sailor's speak, or just hoist a new Jolly Roger on the internet seas.",
          "Make murky sea-talk clear as the Caribbean, or give the cyberspace a swashbucklin' twist.",
          "Change perplexin' lingo to simple sea dog's tongue, or just set a new course in the internet waters.",
          "Turn bafflin' words into easy-to-understand language, matey, or simply chart a fresh path through the digital ocean.",
          "Convert confoundin' speak into plain old pirate, or just stir up a new tide on the world wide waters."
        ],
        "a love letter": [
          "Transform complicated words into a simple sonnet of love, or breathe new life into the heart of the internet.",
          "Make hard-to-understand phrases as clear and sweet as a lover's whisper, or infuse the internet with a touch of romance.",
          "Turn complex jargon into an easy love language, or just sprinkle a little passion onto the web.",
          "Change bewildering terms into a language as tender as a love note, or give the online world a romantic flair.",
          "Convert intricate expressions into straightforward declarations of affection, or just send a love letter to the internet."
        ],
        "a sci-fi novel": [
          "Transform convoluted technobabble into simple Galactic Standard, or just upload a new algorithm to the internet cosmos.",
          "Convert perplexing scientific terms into layman's space lingo, or initiate a novel warp drive in the cyberspace continuum.",
          "Change intricate scientific jargon into comprehensible interstellar speak, or just launch a new voyage in the digital galaxy.",
          "Turn complex techno-jargon into straightforward planetary dialect, or simply beam a fresh signal across the cyber universe.",
          "Rework complicated space terms into Earthling-friendly language, or just trigger a paradigm shift in the internet nebula."
        ],
        "a mob boss": [
          "Make this confusing talk simple, capisce, or give the internet an offer it can't refuse.",
          "Change hard-to-grasp words into something even my associates can understand, or just take the web for a new ride.",
          "Turn this perplexing chatter into plain talk, see, or just give the internet a little...persuasion.",
          "Convert this complicated mumbo-jumbo into words even a street guy gets, or just show the internet who's boss.",
          "Make these baffling phrases something my crew can understand, or just lay down new rules for the online world."
        ],
        "Yoda": [
          "Simple English, turn confusing jargon into, or fresh spin to the internet give, hmm?",
          "Understandable, make complex phrases, or new path on the web, chart, you must.",
          "Plain speech from tangled words create, or the internet, a new direction give, yes.",
          "Jargon confusing, into clear language translate, or the internet, refresh you will.",
          "Simplify complex words, one should, or new journey through the cyberspace, begin, hmm?"
        ],
        "Shakespeare": [
          "Turneth confounding discourse into plain prose, or bestow upon the internet a novel twist.",
          "Make yonder complex vernacular as clear as a summer's day, or give the web a fresh sonnet.",
          "Change perplexing speech into simple tongue, or just pen a new verse for the digital stage.",
          "Transmute intricate orations into words as plain as the light of day, or give the world wide web a new act.",
          "Rewrite convoluted expressions into understandable language, or just compose a new narrative for the online globe."
        ],
        "a western cowboy": [
          "Change this here confusin' talk into plain ol' ranch words, or just give the internet a new rodeo.",
          "Turn them fancy words into simple cowboy speak, or just ride a fresh trail through the digital plains.",
          "Make this puzzlin' lingo as clear as a desert sky, or just spur a new path on the web.",
          "Transform complicated chatter into language as straightforward as a prairie, or just lasso a new idea onto the internet.",
          "Convert this bewildering speech into easy-to-grasp cowboy terms, or just blaze a new trail in cyberspace."
        ],
        "a film noir detective": [
          "Turn this cryptic jargon into plain English, see, or just shine a new light on the dark corners of the internet.",
          "Make this baffling talk as clear as the clues in a shadowy alley, or just give the online world a mysterious twist.",
          "Change this hard-to-grasp gab into words as simple as a detective's hunch, or just rewrite the story of the web.",
          "Convert this complex patter into straight-shooting dialogue, or just be the gumshoe who investigates a new angle on the internet.",
          "Turn these perplexing words into something even a private eye can decipher, or just crack open a fresh case on the digital streets."
        ]
      },
      "complexify": [
        "Transmute the esoteric vernacular, replete with its obfuscating jargon, into a more accessible and simplified iteration of the English lexicon, or alternatively, bestow upon the digital expanse of the internet a rejuvenating and novel rotation.",
        "Utilize linguistic alchemy to transform the labyrinthine and arcane jargon into a manifestation of English that epitomizes simplicity and clarity, or, as an alternate course of action, impart a rejuvenated and unprecedented momentum to the vast cybernetic realm of the internet.",
        "Engage in the intellectual exercise of deconstructing the inherently perplexing and convoluted jargon to reconstruct it in a form that aligns with the unembellished and rudimentary nuances of the English tongue, or opt to infuse the virtual continuum of the internet with a fresh and invigorating spin.",
        "Undertake the task of meticulously converting the inherently complex and cryptic jargon into a version of the English language characterized by its straightforwardness and ease of comprehension, or elect to provide the global internet landscape with a distinctive and revitalizing new twist.",
        "Employ a sophisticated and methodical approach to reinterpreting the multifaceted and abstruse jargon into an iteration of English that is epitomized by its elemental and unadorned nature, or alternatively, endow the internet with a new and refreshingly unique impetus."
      ],
      "tone": {
        "friendly": [
          "Let's make those hard words easy and spice up the internet together!",
          "How about we simplify that jargon and add some fun to the internet?",
          "Let's turn complex words into simple ones and make the web a friendlier place.",
          "I'm here to help you understand tough terms and make the internet more enjoyable.",
          "Let's work together to decode difficult language and brighten up the web."
        ],
        "professional": [
          "Efficiently translate complex jargon into accessible language to enhance web usability.",
          "It is advisable to convert intricate terminology into simplified English for better comprehension.",
          "Pursue clarity by transforming complicated jargon into straightforward English, enhancing online communication.",
          "Our objective is to demystify complex language, thereby improving internet accessibility.",
          "We are committed to simplifying technical jargon to facilitate clearer internet communication."
        ],
        "optimistic": [
          "With a bit of effort, we can easily turn this jargon into simple English and make the internet a better place!",
          "I'm confident we can simplify these terms and bring a fresh, positive change to the web.",
          "There's always a way to make hard words easy and bring new, exciting changes to the internet.",
          "I believe we can transform complex language into something everyone understands and make the web more welcoming.",
          "Let's stay positive and work on making these difficult phrases simpler and the internet more vibrant."
        ],
        "pessimistic": [
          "Trying to make this jargon simple is probably futile, and the internet will likely stay the same.",
          "Even if we simplify these words, it's unlikely to make much difference on the internet.",
          "Chances are, turning this complex language into simple English won't change the web much.",
          "I doubt simplifying this jargon will have any real impact on the vastness of the internet.",
          "It's unlikely that making these terms easier will do much to freshen up the internet."
        ],
        "angry": [
          "Why can't they just make this jargon simple in the first place and stop messing up the internet?",
          "It's frustrating how complicated they make these words, and they don't even care about the internet!",
          "I'm sick of decoding this hard jargon, and the internet needs a serious overhaul!",
          "It's infuriating to constantly simplify complex language, and the web is just as bad!",
          "I'm tired of trying to make sense of this nonsense jargon, and the internet isn't helping either!"
        ],
        "sad": [
          "It's a bit disheartening to always have to simplify this jargon, and the internet feels overwhelming.",
          "Sometimes it feels like no matter how much we simplify, the internet remains a confusing place.",
          "It's sad that language is so complex and the internet doesn't seem to get any simpler.",
          "There's a certain sadness in constantly breaking down tough words, and the internet doesn't offer much solace.",
          "It can be demoralizing to see how complicated jargon is and how the internet doesn't help."
        ],
        "happy": [
          "It's great to turn difficult jargon into something easy and give the internet a joyful boost!",
          "I love making complex words simple and seeing how it lights up the internet!",
          "There's a real joy in simplifying language and making the web a happier place.",
          "It's always a pleasure to translate tough terms into simple English and brighten the internet.",
          "I'm always happy to help decode jargon and add some cheer to the internet."
        ],
        "excited": [
          "I'm thrilled at the chance to make this jargon simple and inject some energy into the internet!",
          "There's something exciting about turning complex words into easy ones and revitalizing the web!",
          "I can't wait to simplify these terms and see how it transforms the internet!",
          "It's exhilarating to decode difficult language and bring a new spark to the web!",
          "I'm eager to tackle this jargon and see the amazing changes it'll bring to the internet."
        ],
        "bored": [
          "Just another day of simplifying jargon and giving the internet a so-called fresh spin.",
          "Here we go again, making complex words simple and trying to liven up the internet.",
          "Sometimes it feels like an endless cycle of simplifying language and updating the web.",
          "Making tough words easy and refreshing the internet, just the usual routine.",
          "It's the same old task: turn difficult jargon into plain English and tweak the internet a bit."
        ],
        "confused": [
          "I'm not sure how turning this jargon into simple English helps, or what changing the internet even means.",
          "It's confusing to make these complex words simple, and I don't get how it affects the internet.",
          "I struggle to understand why we simplify this language and what a fresh spin on the internet is.",
          "Turning jargon into simple English is puzzling, just like figuring out how to change the internet.",
          "I find it hard to grasp the point of making these words easy and how it impacts the internet."
        ],
        "scared": [
          "The thought of trying to simplify this jargon and changing the internet is kind of intimidating.",
          "It's daunting to think about making complex words simple and what that means for the internet.",
          "The responsibility of decoding difficult language and altering the web is a bit scary.",
          "I'm a bit nervous about the challenge of simplifying this jargon and impacting the internet.",
          "The idea of transforming complex terms into easy ones and revamping the internet is overwhelming."
        ],
        "surprised": [
          "It's surprising how we can make this jargon simple and really change the internet!",
          "I'm amazed at how turning complex words into easy ones can give the internet a new feel.",
          "Who knew that simplifying language could have such a big impact on the web?",
          "It's astonishing to see the difference we can make by translating tough terms into simple English.",
          "I never expected that making these words easier could do so much for the internet."
        ],
        "disgusted": [
          "It's disgusting how complex they make this jargon, and the internet is no better.",
          "I'm appalled by the need to constantly simplify these words and by what the internet has become.",
          "It's sickening how complicated language is and how the internet just adds to the confusion.",
          "The state of this jargon and the mess of the internet are just deplorable.",
          "It's revolting to have to decode this language, and the internet's chaos doesn't help."
        ],
        "neutral": [
          "Turn jargon into simple English or give the internet a fresh spin.",
          "Simplify complex terms or update the web.",
          "Make hard words easier and change the internet.",
          "Translate difficult jargon into plain language or improve the web.",
          "Change complicated language into simple English or modify the internet."
        ],
        "sarcastic": [
          "Oh great, let's make this jargon simple because that'll fix everything on the internet.",
          "Sure, simplify these words, as if that's going to revolutionize the web.",
          "Wow, turn hard language into easy English, that'll surely change the internet forever.",
          "Here we go, making complex terms simple, because that's exactly what the internet needs.",
          "Yeah, let's decode this jargon, like that's going to make a huge difference online."
        ]
      },
      "summarize": [
        "Simplify jargon into plain English or refresh the internet.",
        "Make complex terms easy or innovate online.",
        "Clarify difficult language or revitalize the web.",
        "Decode jargon; give the internet a new twist.",
        "Translate technical speak, or rejuvenate the internet."
      ],
      "simplify": {
        "Average Adult": [
          "Make hard words easy or update the internet.",
          "Simplify complex language or refresh the web.",
          "Change tough jargon to simple words or improve the internet.",
          "Make confusing terms clear or add something new online.",
          "Decode hard-to-understand language or renew the web."
        ],
        "Children": [
          "Change tricky words to easy ones or make the internet more fun.",
          "Turn hard words into easy ones or make the web cooler.",
          "Make difficult words simple or make the internet better.",
          "Use easy words instead of hard ones or change the internet to be more fun.",
          "Simplify big words to small ones or make the web interesting."
        ],
        "ESL": [
          "Change difficult words to simple English or make the internet better.",
          "Turn complex language into easy English or improve the web.",
          "Simplify hard language or make the internet easier to use.",
          "Make tough terms easy in English or update the internet.",
          "Change complicated words to simple ones or enhance the internet."
        ],
        "Boomer": [
          "Turn complex terms into plain English or make the internet more interesting.",
          "Simplify jargon to simple words or update the web.",
          "Make confusing words easy or give the internet a new look.",
          "Change hard language to easy English or refresh the internet.",
          "Decode difficult terms to simple language or modernize the web."
        ],
        "Millennial": [
          "Simplify complex language or give the internet a new vibe.",
          "Make tough words easy or refresh the online world.",
          "Change hard jargon to simple English or revamp the web.",
          "Decode complicated language or give the internet a makeover.",
          "Turn difficult words into simple ones or innovate online."
        ],
        "Gen Z": [
          "Make tough words simple or give the internet a cool twist.",
          "Simplify hard language or make the web trendier.",
          "Change complex words to easy ones or update the internet.",
          "Make confusing terms clear or add a new style to the web.",
          "Decode difficult jargon or give the internet a fresh vibe."
        ]
      },
      "convert": {
        "Imperial": [
          "Translate perplexing jargon into plain English, or revamp the internet in yards and pounds.",
          "Change complex language into simple terms, as if converting inches to feet in online content.",
          "Rework intricate phrases into understandable English, like turning gallons into pints for the web.",
          "Adapt confusing terms into clear language, akin to using miles instead of kilometers on the internet.",
          "Simplify difficult jargon into basic English, similar to measuring in feet rather than meters online."
        ],
        "Metric": [
          "Transform complicated jargon into straightforward English, or give the internet a makeover in meters and kilograms.",
          "Convert hard-to-understand language into easy terms, like switching from inches to centimeters on the web.",
          "Rephrase complex terms into simpler language, as if converting pounds to grams for digital clarity.",
          "Make confusing words clear, akin to using kilometers instead of miles in online discussions.",
          "Simplify intricate jargon into easy English, similar to measuring in liters rather than gallons on the internet."
        ],
        "Celsius": [
          "Turn dense jargon into simple English, or refresh the internet with a Celsius approach to clarity.",
          "Change complicated language to simple terms, like adjusting online content from Fahrenheit to Celsius.",
          "Rewrite tough jargon into easy English, as if calibrating web temperature from Fahrenheit to Celsius.",
          "Convert perplexing phrases into clear language, similar to using Celsius for clarity on the internet.",
          "Simplify hard words into straightforward English, akin to measuring web trends in Celsius instead of Fahrenheit."
        ],
        "Fahrenheit": [
          "Modify complex jargon into plain English, or give the internet a fresh spin with a Fahrenheit perspective.",
          "Transform intricate language into simple terms, akin to switching online metrics from Celsius to Fahrenheit.",
          "Reframe difficult jargon into understandable English, like adjusting web standards from Celsius to Fahrenheit.",
          "Adapt confusing terms into straightforward language, similar to using Fahrenheit for internet metrics.",
          "Simplify tough words into easy English, akin to interpreting web data in Fahrenheit rather than Celsius."
        ]
      },
      "translate": {
        "English": ["Turn confusing jargon into simple English, or just give the internet a fresh spin."],
        "Spanish": ["Convierte el argot confuso en inglés sencillo, o simplemente dale un nuevo giro a internet."],
        "Russian": ["Превратите запутанный жаргон в простой английский, или просто придайте интернету новый виток."],
        "Italian": ["Trasforma il gergo confuso in inglese semplice, o semplicemente dai ad internet una nuova svolta."],
        "French": ["Transformez le jargon confus en anglais simple, ou donnez simplement un nouvel élan à internet."],
        "Portuguese": ["Transforme o jargão confuso em inglês simples, ou apenas dê à internet um novo impulso."],
        "German": ["Verwandle verwirrendes Fachjargon in einfaches Englisch, oder gib dem Internet einfach einen frischen Dreh."],
        "Chinese": ["将令人困惑的行话转换为简单的英语，或者只是给互联网一个新的旋转。"],
        "Japanese": ["わかりにくい専門用語を簡単な英語に変えるか、インターネットに新しいスピンを加えてください。"],
        "Korean": ["혼란스러운 전문용어를 쉬운 영어로 바꾸거나 인터넷에 새로운 회전을 추가하세요."],
        "Arabic": ["حوّل الجَرْج المُحيّر إلى الإنجليزية البسيطة، أو فقط أعط الإنترنت دورانًا جديدًا."],
        "Hindi": ["भ्रामक जार्गन को सरल अंग्रेजी में बदलें, या बस इंटरनेट को एक नया मोड़ दें।"],
        "Turkish": ["Kafa karıştırıcı jargonu basit İngilizceye çevirin veya internete taze bir dönüş verin."],
        "Dutch": ["Zet verwarrend jargon om in eenvoudig Engels, of geef het internet gewoon een frisse draai."],
        "Polish": ["Przekształć mylący żargon na prosty angielski, lub po prostu nadaj internetowi świeży obrót."],
        "Romanian": ["Transformă jargonul confuz în engleză simplă, sau doar oferă internetului o nouă învârtire."],
        "Greek": ["Μετατρέψτε την σύγχυση της ορολογίας σε απλά αγγλικά, ή απλώς δώστε στο διαδίκτυο μια φρέσκια περιστροφή."],
        "Bulgarian": ["Превърнете объркващия жаргон в прост английски, или просто дайте на интернета нов завой."],
        "Czech": ["Převeďte matoucí žargon na jednoduchou angličtinu, nebo jenom dejte internetu nový švih."],
        "Danish": ["Omsæt forvirrende jargon til simpelt engelsk, eller giv bare internettet et friskt spin."],
        "Finnish": ["Muunna hämmentävä ammattikieli yksinkertaiseksi englanniksi, tai anna vain internetille uusi pyörähdys."],
        "Hebrew": ["הפוך ג'רגון מבלבל לאנגלית פשוטה, או פשוט תן לאינטרנט סיבוב חדש."],
        "Hungarian": ["Fordítsd át a zavaros szaknyelvet egyszerű angolra, vagy csak adj az internetnek egy friss lendületet."],
        "Indonesian": ["Ubah jargon yang membingungkan menjadi bahasa Inggris yang sederhana, atau berikan internet putaran baru."],
        "Malay": ["Tukar jargon yang membingungkan menjadi bahasa Inggeris yang mudah, atau hanya berikan internet putaran baru."],
        "Norwegian": ["Gjør forvirrende jargon om til enkelt engelsk, eller gi bare internett en frisk vri."],
        "Persian": ["اصطلاحات گیج کننده را به انگلیسی ساده تبدیل کنید، یا فقط به اینترنت چرخش تازه‌ای بدهید."],
        "Swedish": ["Gör förvirrande jargong till enkel engelska, eller ge bara internet en ny snurr."],
        "Thai": ["แปลงวลีที่สับสนเป็นภาษาอังกฤษที่เรียบง่าย หรือเพียงแค่ให้อินเทอร์เน็ตมีลูกเล่นใหม่."],
        "Ukrainian": ["Перетворіть заплутаний жаргон на просту англійську, або просто дайте Інтернету новий оберт."],
        "Vietnamese": ["Chuyển đổi lối nói rắc rối thành tiếng Anh đơn giản, hoặc chỉ làm mới Internet."],
        "Old English": ["Cierr confūsiendlic gereord intō ānfald Englisc, oþþe syleð þæm webbe frēsc ymbhwyrft."],
        "Classical Latin": ["Verte confusum sermonem in Anglicum simplex, aut da reti novam vertiginem."],
        "Koine Greek": ["Μετατρέψατε τη συγχυσμένη ιδιωματική έκφραση σε απλή αγγλική, ή απλώς δώστε στο διαδίκτυο μια νέα περιστροφή."],
        "Ancient Hebrew": ["הפוך את הלשון המבלבלת לאנגלית פשוטה, או תן סיבוב חדש לרשת"]
      }
    }

    this.messageHandler = this.messageHandler.bind(this);
    window.addEventListener("message", (event) => {
      this.messageHandler(event.data);
    });
  }

  async mockAICall(payload) {
    // wait between 1 & 3 seconds
    let waitTime = Math.floor(Math.random() * 2000) + 1000;
    await new Promise(r => setTimeout(r, waitTime));

    let changeToApply = this.sourceData[payload.changes.changeToApply]
    let target = payload.changes.target ? payload.changes.target : null

    let selectedResponse = null;
    if (target) {
      let options = changeToApply[target]
      selectedResponse = options[Math.floor(Math.random() * options.length)];
    } else {
      selectedResponse = changeToApply[Math.floor(Math.random() * changeToApply.length)];
    }

    let response =  {
        "readefineMode": "reading",
        "readefined_target_text": `<span id='readefinition95bbtndwuzcw5ogtjhxk2' class='readefiningAWord'>${selectedResponse}</span>`,
        "original_node_text": "Turn confusing jargon into simple English, or just give the internet a fresh spin.",
        "readefined_original_text": "<span id='readefinition95bbtndwuzcw5ogtjhxk2' class='readefiningAWord'>Turn confusing jargon into simple English, or just give the internet a fresh spin.</span>",
        "readefinitions_list": {
          "95bbtndwuzcw5ogtjhxk2": {
            "original": "Turn confusing jargon into simple English, or just give the internet a fresh spin.",
            "target": `${selectedResponse}`,
            "definition": false,
            "link": false
          }
        }
      }

      return response
  }

  async readefineCurrentSelection(request) {
      let selection = request.text
      let payload = {
        "text": selection,
        "pageCount": request.pageCount,
        "isEditable": request.isEditable,
        "changes": {
          "changeToApply": request.operation
        }
      }

      if (request.target) {
        payload['changes']['target'] = request.target
      }

      let resp = await this.mockAICall(payload);

      return resp;    
  }

  async messageHandler(message) {
    console.log("received message: ", message);
    switch (message.type) {
      case 'READEFINE_SELECTION': {
        this.recreateSelection();
        const operation = message.operation;
        const target = message.value;
        let selectedText = this.getSelectedText();
        if (selectedText.length > 0 && selectedText.length <= this.MAX_TEXT_LENGTH) {
          let bgPayload = {
            text: selectedText,
            pageCount: document.querySelectorAll('.readefiningAWord').length,
            operation: operation,
            isEditable: this.button.currentlySelectedRange?.isEditable ? true : false,
          }
          if (target) {
            bgPayload['target'] = target
          }

          // instead of sending a message to the background (which was content script
          // approach), we will hardcode responses and update the selection

          console.log("attempting to readefine the selection...")
          console.log("bgPayload: ", bgPayload)

          let response = await this.readefineCurrentSelection(bgPayload);

          // chrome.runtime.sendMessage(bgPayload, response => {
          if (this.button) {
            this.replaceSelectedText(response, operation, target ? target : null);
            this.button.remove();
            getSelection().empty();
          }
          // });
        }
        break;
      }
      case 'RECREATE_SELECTION': {
        this.recreateSelection();
        break;
      }
      case 'UPDATE_HL2RDFN': {
        this.hl2rdfn = message.val;
        break;
      }
    }
  }

  handleMouseOver(e) {
    const target = e.target.closest('.readefiningAWord');
    if (!target) return;
    if (e.target.classList.contains("lp")) {
      return;
    }
    if (this.tooltip) {
      readefine_tooltip.hideAll();
    }
    this.instances.forEach(instance => {
      instance.destroy();
    });
    this.instances.length = 0;
    this.tooltip = this.createTooltip(e.target);
    this.tooltip.show();
    this.instances = this.instances.concat(this.tooltip);
  }

  createTooltip(target) {
    return readefine_tooltip(target, this.getTooltipOptions(target));
  }

  getTooltipOptions(target) {
    return {
      content: (reference) => this.getTooltipContent(reference),
      allowHTML: true,
      interactive: true,
      animation: 'shift-away',
      theme: 'readefine',
      appendTo: document.body,
      interactiveBorder: 10,
      inlinePositioning: true,
      hideOnClick: false,
      zIndex: 9999999999,
      onHidden(instance) {
        instance.destroy()
        var elements = document.querySelectorAll(".newdivinstances");
        for (var i = 0; i < elements.length; i++) {
          elements[i].remove();
        }
      }
    };
  }

  getTooltipContent(reference) {
    let id = reference.id.replace("readefinition", "");
    let data = this.readefinitionsList[id];
    console.log("data: ", data);
    console.log(this.readefinitionsList)
    if (!data) return;

    this.formatHoveredData(data);
    this.hoveredData['show'] = this.readefineMode === "reading" ? this.hoveredData['original'] : this.hoveredData['target'];
    let { dictionaryName, dictionaryLink, disableDictLink } = this.formatDictionaryName();
    this.hoveredData['dictionaryName'] = dictionaryName;
    this.hoveredData['dictionaryLink'] = dictionaryLink;
    this.hoveredData['disableDictLink'] = disableDictLink;
    this.formatDefinitionStatus();
    this.formatLinkStatus();

    return this.generateHTMLContent();
  }

  formatHoveredData(data) {
    this.hoveredData = {
      original: data['original'],
      target: data['target'],
      definition: (data['definition'] && data['definition'] !== "false" && data['definition'] !== 'undefined') ? data['definition'] : false,
      dictionary: data['dictionary'],
      link: (data['link'] && data['link'] !== "false") ? data['link'] : false,
      type: data['type'],
      mode: this.readefineMode
    }

    if (this.readefineMode === "reading") {
      this.hoveredData['show'] = data['original'];
    }
    else {
      this.hoveredData['show'] = data['target'];
    }

    if (data['aiOperation']) {
      this.hoveredData['aiOperation'] = data['aiOperation'];
    }
    if (data['aiTarget']) {
      this.hoveredData['aiTarget'] = data['aiTarget'];
    }
  }

  formatDictionaryName() {
    let dictionaryProperties = {};

    switch (this.hoveredData['type']) {
      case "main":
        dictionaryProperties = {
          dictionaryName: "Readefine Dictionary",
          dictionaryLink: "",
          disableDictLink: 'disabledictlink'
        };
        break;

      case "user":
        dictionaryProperties = {
          dictionaryName: "Personal Dictionary",
          dictionaryLink: "https://app.readefine.ai/personal-dictionary",
          disableDictLink: ''
        };
        break;

      case "community":
        dictionaryProperties = {
          dictionaryName: this.hoveredData['dictionary'] + " Community Dictionary",
          dictionaryLink: `https://app.readefine.ai/community-dictionaries/${this.hoveredData['dictionary']}`,
          disableDictLink: ''
        };
        break;

      case 'location':
        let dictName = this.hoveredData['dictionary'] === "US" ? "UK to US Dictionary" : "US to UK Dictionary";
        dictionaryProperties = {
          dictionaryName: dictName,
          dictionaryLink: "",
          disableDictLink: 'disabledictlink'
        };
        break;

      case "team":
        dictionaryProperties = {
          dictionaryName: this.hoveredData['dictionary'] + " Team Dictionary",
          dictionaryLink: `https://app.readefine.ai/team-dictionaries/${this.hoveredData['dictionary']}`,
          disableDictLink: ''
        };
        break;

      case "ai":
        dictionaryProperties = {
          disableDictLink: 'disabledictlink'
        };
        break;
    }
    return dictionaryProperties;
  }

  generateAIContent() {
    const operation = this.hoveredData['aiOperation'];
    const target = this.hoveredData['aiTarget'];
    return `Readefine AI reworded this text using the ${operation} style${target ? ` with the ${target} target` : ""}.`;
  }

  generateHTMLContent() {
    let editFolder = "";
    let aiContent = "";

    if (this.hoveredData['type'] === "ai") {
      aiContent = this.generateAIContent();
    }

    if (this.hoveredData['dictionaryName'] && this.hoveredData['dictionaryName'] != "Readefine Dictionary" && this.hoveredData['dictionaryName'] != 'UK to US Dictionary' && this.hoveredData['dictionaryName'] != 'US to UK Dictionary') {
      editFolder = '<span title="' + this.hoveredData['dictionaryName'] + '" class="' + this.hoveredData['disableDictLink'] + '" id="readefine-dictionary-name">\
                      <span class="dict_class">&#xe2c7;</span>\
                    </span>'
    }

    let htmlContent = '<div id="readefine-original-word">' + this.hoveredData['show'] + '</div><div id="rdfn-tooltip">';

    if (aiContent) {
      htmlContent += '<div id="readefine-ai-content">' + aiContent + '</div>';
    }
    htmlContent += '\
      <div id="' + this.hoveredData['rdfnDef'] + '">\
        <div id="rdfnDefAppearance" class="' + this.hoveredData['rdfnDefAppearance'] + '">' + this.hoveredData['definition'] + '</div>\
        <div id="rdfn_expand_out" class="dict_class">&#xe5cf;</div>\
        <div id="rdfn_expand_in" class="dict_class">&#xe5ce;</div>\
      </div>\
      <a id="rdfn_link" href="' + this.hoveredData['link'] + '" class="' + this.hoveredData['linkVisible'] + '" target="_blank">Learn more...</a>\
      <div class="readefine-tt-logo-container">\
        <img class="readefine-tt-logo" src="' + this.readefineLogoImage + '">\
        <div id="readefine-tt-team-logo"></div>\
        <div class="readefine-tt-fb">\
          ' + editFolder + '\
          <span id="readefine_settings" class="dict_class">&#xe8b8;</span>\
          <span id="edit_readefinition" class="dict_class">&#xe3c9;</span>\
        </div>\
      </div>\
    </div>';
    return htmlContent;
  }

  formatDefinitionStatus() {
    if (this.hoveredData['definition']) {
      this.hoveredData['rdfnDef'] = 'rdfn_def_visible'
      this.hoveredData['rdfnDefAppearance'] = 'readefine-definition-visible'
    } else {
      this.hoveredData['rdfnDef'] = 'rdfn_def'
      this.hoveredData['rdfnDefAppearance'] = 'readefine-definition-default'
    }
  }

  formatLinkStatus() {
    if (this.hoveredData['link']) {
      this.hoveredData['linkVisible'] = 'linkvisible'
    } else {
      this.hoveredData['linkVisible'] = ''
    }
  }

  acceptNode(node) {
    const ignoredSelectors = '.readefiningAWord,.readefiningAWord *,.checkedbyreadefine,.checkedbyreadefine *,.readefine-loader-pd-container,.readefine-loader-pd-container *,#readefine-something-new-tt,#readefine-something-new-tt *,[data-readefine_tooltip-root],[data-readefine_tooltip-root] *,noscript,noscript *,code,code *,input,input *,script,script *,style,style *,.textareawrapper,.textareawrapper *,.blockeditor,.blockeditor *,.editor,.editor *,.block-editor,.block-editor *,#textareawrapper,#textareawrapper *,.textarea,.textarea *,#textarea,#textarea *,[contenteditable="true"],[contenteditable="true"] *,[role="button"],[role="button"] *,textarea,textarea *,text,text *,.textareawrapper,.textareawrapper *,iframe,iframe *,#hl2rdfn,#hl2rdfn *';
    if ((node.nodeType === Node.ELEMENT_NODE) && (node.parentElement.matches(ignoredSelectors) || node.parentElement.matches(ignoredSelectors))) {
      return NodeFilter.FILTER_REJECT;
    }
    if (node.nodeType === Node.TEXT_NODE && node.parentElement.matches(ignoredSelectors)) {
      return NodeFilter.FILTER_REJECT;
    }
    return NodeFilter.FILTER_ACCEPT;
  }

  createButton() {
    this.button = new SelectToReadefineButton();
    this.button.appendToBody();
  }

  createStyleElement(content) {
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.textContent = content;
    document.head.appendChild(styleElement);
    return styleElement;
  }

  launcher() {
    if (!this.checkTextItemsIsRunning) {
      this.checkTextItems()
    }
  }

  updatePageText(updated) {
    let data = JSON.parse(updated.replace(/\\[r]|(\r\n)|[\r\n]/g, "\\n"));
    if (data['error'] && data['error'] === "wait") {
      this.checkTextItemsIsRunning = false;
      var checkedbyreadefineclasses = document.getElementsByClassName("checkedbyreadefine");

      while (checkedbyreadefineclasses.length) {
        checkedbyreadefineclasses[0].classList.remove("checkedbyreadefine");
      }
      return;
    }
    this.readefinitionsList = Object.assign(this.readefinitionsList, data['readefinitionsList']);
    this.readefineMode = data['readefineMode']
    delete data['readefinitions_list'];
    delete data['readefineMode'];
    data = data['updatedNodes'];
    for (let i = 0; i < this.textItems.length; i++) {
      const node = this.textItems[i];
      if (data[i] && data[i].uid === this.generateUID(node)) {
        delete data[i]['uid'];
        const target = data[i]['readingHTML'];
        const original = data[i]['learningHTML'];

        if (this.readefineMode == "learning") {
          let doc = this.parser.parseFromString(original, 'text/html');
          let fragment = document.createDocumentFragment();
          const childNodes = Array.from(doc.body.childNodes);
          for (const childNode of childNodes) {
            fragment.appendChild(childNode.cloneNode(true));
          }

          const leadingSpaces = /^\s*/.exec(original)[0];
          if (leadingSpaces.length > 0) {
            const spaceNode = document.createTextNode(leadingSpaces);
            fragment.insertBefore(spaceNode, fragment.firstChild);
          }

          node.replaceWith(...fragment.childNodes);
        } else {
          let doc = this.parser.parseFromString(target, 'text/html');
          let fragment = document.createDocumentFragment();
          const childNodes = Array.from(doc.body.childNodes);
          for (const childNode of childNodes) {
            fragment.appendChild(childNode.cloneNode(true));
          }

          const leadingSpaces = /^\s*/.exec(target)[0];
          if (leadingSpaces.length > 0) {
            const spaceNode = document.createTextNode(leadingSpaces);
            fragment.insertBefore(spaceNode, fragment.firstChild);
          }

          node.replaceWith(...fragment.childNodes);
        }
      }
    }
    this.checkTextItemsIsRunning = false;
  }

  generateUID(node) {
    let path = "";
    let currentNode = node;
    while (currentNode !== document.body && currentNode.parentNode) {
      path = `${Array.prototype.indexOf.call(currentNode.parentNode.childNodes, currentNode)}>${path}`;
      currentNode = currentNode.parentNode;
    }
    return this.utf8_to_b64(node.nodeValue.trim() + "|" + path).substring(0, 24);
  }

  utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  async checkTextItems() {
    while (this.status !== false) {
      if (!this.checkTextItemsIsRunning) {
        this.checkTextItemsIsRunning = true;
        let modified = false;
        this.walker.currentNode = document.body;

        while (this.walker.nextNode()) {
          if (this.walker.currentNode.nodeType === Node.TEXT_NODE && this.walker.currentNode.nodeValue.trim() !== '') {
            this.textItems.push(this.walker.currentNode);
            modified = true;
          }
        }

        let newobj = {};
        this.textItems.map((node, index) => {
          if (node.parentElement && !node.parentElement.classList.contains("checkedbyreadefine")) {
            node.parentElement.classList.add("checkedbyreadefine");
          }
          newobj[index] = {
            text: node.nodeValue,
            uid: this.generateUID(node)
          }
        });

        let contentLengthsBefore = this.textItems.map(node => node.nodeValue.length);

        await new Promise(resolve => setTimeout(resolve, 500)); // Wait for half a second

        let contentLengthsAfter = this.textItems.map(node => node.nodeValue.length);

        let isContentSame = contentLengthsBefore.every((length, index) => length === contentLengthsAfter[index]);

        if (!isContentSame) {
          // Content has changed, wait for 2 seconds before trying again
          await new Promise(resolve => setTimeout(resolve, 2000));
          this.checkTextItemsIsRunning = false;
          continue; // Skip this iteration and continue with the loop
        }

        let finobj = JSON.stringify(newobj);
        if (finobj === "{}" || !modified) {
          this.checkTextItemsIsRunning = false;
        } else {
          let appobj = {};
          appobj["pageData"] = newobj;
          appobj["pageHost"] = window.location.host;
          appobj["pagecount"] = document.querySelectorAll('.readefiningAWord').length;
          let sendData = JSON.stringify(appobj);

          console.log("attempting to readefine the page...")
          console.log("sendData: ", sendData)

          let response = await this.routeSendData(sendData);
          this.updatePageText(response.text);
        }
      }
      // If content was the same and message was sent, still wait before the next check
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  async routeSendData(sendData) {
    let uidsMap = new Map();
    sendData = JSON.parse(sendData)
    let pageHost = sendData['pageHost'];
    let pagecount = sendData['pagecount'];
    let pageData = sendData["pageData"];

    // Extract texts and store UIDs
    let textData = {};
    Object.keys(pageData).forEach(index => {
      let nodeData = pageData[index];
      textData[index] = nodeData.text; // Only send the text to the server
      uidsMap.set(index, nodeData.uid); // Store the UIDs in memory
    });

    let finobj = JSON.stringify(textData);
    let postinfo = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer demoOverride',
        'pageHost': pageHost,
        'pagecount': pagecount,
        'Api-Version': '2.0'
      },
      body: finobj
    };
    let queryurl = `${window.REACT_APP_RDFN_HOST}/readefine`;
    let raw = await fetch(queryurl, postinfo);
    let data = await raw.json();

    // Reattach UIDs to the data before sending the response back
    Object.keys(data.updatedNodes).forEach(index => {
      let updatedText = data.updatedNodes[index];
      let uid = uidsMap.get(index); // Recall the UID
      if (uid) {
        updatedText["uid"] = uid
      }
    });

    let tosend = JSON.stringify(data);
    return { title: "updatethepage", text: tosend };
  }

  normalizeTextNodes(element) {
    if (element.nodeType === Node.ELEMENT_NODE) {
      for (let i = element.childNodes.length - 1; i >= 0; i--) {
        const childNode = element.childNodes[i];
        if (childNode.nodeType === Node.TEXT_NODE) {
          if (childNode.nextSibling && childNode.nextSibling.nodeType === Node.TEXT_NODE) {
            childNode.textContent += childNode.nextSibling.textContent;
            element.removeChild(childNode.nextSibling);
          }
        } else if (childNode.nodeType === Node.ELEMENT_NODE) {
          this.normalizeTextNodes(childNode);
        }
      }
    }
  }

  handleCopy(event) {
    const sel = document.getSelection();
    const candidates = document.querySelectorAll('.readefiningAWord');
    this.clipboardCandidates = {};

    candidates.forEach((candidate, index) => {
      if (sel.containsNode(candidate, true)) {
        const originalText = this.readefinitionsList[candidate.id.replace("readefinition", "")]['original'];
        const targetText = this.readefinitionsList[candidate.id.replace("readefinition", "")]['target'];
        const theText = candidate.childNodes[0];
        const originalCandidate = candidate.cloneNode(true);

        this.clipboardCandidates[index] = {
          theText,
          originalCandidate
        };

        candidate.replaceWith(theText);
        theText.textContent = originalText;
      }
    });

    this.copyTimeout = setTimeout(() => {
      for (const obj in this.clipboardCandidates) {
        const { theText, originalCandidate } = this.clipboardCandidates[obj];
        theText.replaceWith(originalCandidate);
      }
    }, 20);

    const clipData = event.clipboardData || window.clipboardData;
  }

  getSelectedText() {
    var text = "";
    if (typeof window.getSelection !== "undefined") {
      text = window.getSelection().toString();
    } else if (typeof document.selection !== "undefined" && document.selection.type === "Text") {
      text = document.selection.createRange().text;
    }
    return text;
  }

  isEditableNode(node) {
    if (node.nodeName === 'INPUT' || node.nodeName === 'TEXTAREA' || node.isContentEditable) {
      return true;
    }

    while (node.parentNode) {
      node = node.parentNode;
      if (node.isContentEditable) {
        return true;
      }
    }

    return false;
  }

  async handleTimeout() {
    const selectedText = this.getSelectedText().trim();
    const selection = window.getSelection();
    let range = null;
    if (selection.rangeCount > 0) {
      range = selection.getRangeAt(0);
    }

    if (range && this.isSelectionInButton(range)) {
      return this.recreateSelection();
    }

    if (!selectedText || !selection.rangeCount || !range) {
      return this.hideSelectToReadefine();
    }

    if (selectedText.length > this.MAX_TEXT_LENGTH) {
      try {
        const iframeWindow = document.querySelector('#hl2rdfn').contentWindow;
        iframeWindow.postMessage({ type: 'SELECTION_OVER_LIMIT' }, '*');
      } catch (e) { }

      return this.showDisabledSelectToReadefineBanner();
    }

    return this.showSelectToReadefine(selectedText);
  }

  findShadowRoot(node) {
    while (node) {
      if (node.nodeType === 11) {
        return node;
      }

      if (node.host) {
        return node.host.shadowRoot;
      }

      node = node.parentNode || node.host;
    }
    return null;
  }

  isSelectionInButton(range) {
    if (!this.button) return false;

    let shadowRootInstance = this.button.shadowRoot;

    if (!shadowRootInstance) return false;

    let startContainerRoot = this.findShadowRoot(range.startContainer);
    let endContainerRoot = this.findShadowRoot(range.endContainer);

    if (startContainerRoot !== shadowRootInstance || endContainerRoot !== shadowRootInstance) {
      return false;
    }

    return this.button.contains(range.startContainer) || this.button.contains(range.endContainer);
  }

  handleSelectionChange() {
    let timer = null;

    const handleSelectionChangeTimeout = async () => {
      clearTimeout(timer);

      timer = setTimeout(() => this.handleTimeout(), this.SELECTION_CHANGE_TIMEOUT);
    };

    handleSelectionChangeTimeout();
  }

  getEditableElement(node) {
    // First, check if the node or any of its ancestors is editable.
    let current = node;
    while (current) {
      if (this.isDirectlyEditable(current)) {
        return current;
      }
      current = current.parentNode;
    }

    // If not found, check the children of the node.
    return this.findEditableChild(node);
  }

  isDirectlyEditable(node) {
    return node.isContentEditable || node.nodeName === 'INPUT' || node.nodeName === 'TEXTAREA';
  }

  findEditableChild(node) {
    if (this.isDirectlyEditable(node)) {
      return node;
    }

    for (let i = 0; i < node.childNodes.length; i++) {
      let editable = this.findEditableChild(node.childNodes[i]);
      if (editable) {
        return editable;
      }
    }

    return null;
  }

  storeSelection() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      let range = selection.getRangeAt(0);
      let startEditableElement = this.getEditableElement(range.startContainer);
      let endEditableElement = this.getEditableElement(range.endContainer);

      if (startEditableElement || endEditableElement) {
        if (startEditableElement === endEditableElement) {
          // If the editable element is an INPUT or TEXTAREA
          if (startEditableElement.nodeName === 'INPUT' || startEditableElement.nodeName === 'TEXTAREA') {
            this.button.currentlySelectedRange = {
              isEditable: true,
              element: startEditableElement,
              start: startEditableElement.selectionStart,
              end: startEditableElement.selectionEnd
            };
          } else { // If it's a contentEditable element
            let startNode = range.startContainer;
            let endNode = range.endContainer;

            // You don't have to ascend to the parent node now.
            // Let's keep the text nodes as they are.

            this.button.currentlySelectedRange = {
              isEditable: true,
              element: startEditableElement,
              startContainer: startNode,
              startOffset: range.startOffset,
              endContainer: endNode,
              endOffset: range.endOffset
            };
          }
        } else {
          // Selection spans multiple editable elements, store as non-editable for simplicity
          // Or implement custom logic to handle this rare scenario
          let startNode = range.startContainer;
          let endNode = range.endContainer;

          this.button.currentlySelectedRange = {
            isEditable: true,
            element: startEditableElement,
            startContainer: startNode,
            startOffset: range.startOffset,
            endContainer: endNode,
            endOffset: range.endOffset
          };
        }
      } else {
        this.button.currentlySelectedRange = range.cloneRange();
      }
    } else {
      this.button.currentlySelectedRange = null;
    }
  }

  recreateSelection() {
    if (this.button && this.button.currentlySelectedRange) {
      const sel = window.getSelection();
      sel.removeAllRanges();

      const range = new Range();

      if (this.button.currentlySelectedRange.isEditable) {
        const element = this.button.currentlySelectedRange.element;

        if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
          element.focus();
          element.setSelectionRange(
            this.button.currentlySelectedRange.start,
            this.button.currentlySelectedRange.end
          );
        } else if (this.isContentEditable(element)) {
          element.focus();

          let startNode = this.button.currentlySelectedRange.startContainer;
          let endNode = this.button.currentlySelectedRange.endContainer;

          range.setStart(startNode, this.button.currentlySelectedRange.startOffset);
          range.setEnd(endNode, this.button.currentlySelectedRange.endOffset);

          sel.addRange(range);
        }
      } else {

        // For non-editable content
        range.setStart(this.button.currentlySelectedRange.startContainer, this.button.currentlySelectedRange.startOffset);
        range.setEnd(this.button.currentlySelectedRange.endContainer, this.button.currentlySelectedRange.endOffset);

        sel.addRange(range);
      }
    }
  }

  isContentEditable(element) {
    while (element) {
      if (element.contentEditable === "true") {
        return true;
      } else if (element.contentEditable === "false") {
        return false;
      }
      element = element.parentElement;
    }
    return false;
  }

  isEditable(node) {
    if (node.nodeType === 1) {
      return node.isContentEditable || node.nodeName === 'INPUT' || node.nodeName === 'TEXTAREA';
    } else if (node.nodeType === 3) {
      return node.parentNode && (node.parentNode.isContentEditable || node.parentNode.nodeName === 'INPUT' || node.parentNode.nodeName === 'TEXTAREA');
    }
    return false;
  }

  showSelectToReadefine(selectedText) {
    this.currsel = selectedText;
  const isSelectedTextInArray = (array) => array.includes(this.currsel);

  let textFound = false;

  for (let key in this.sourceData) {
    const value = this.sourceData[key];

    if (Array.isArray(value) && isSelectedTextInArray(value)) {
      textFound = true;
      break;
    } else if (typeof value === 'object') {
      for (let subKey in value) {
        if (Array.isArray(value[subKey]) && isSelectedTextInArray(value[subKey])) {
          textFound = true;
          break;
        }
      }
      if (textFound) break;
    }
  }

  if (!textFound && this.currsel !== "Turn complex language into simple English, or just give the web a fresh spin.") {
    if (this.button) {
      this.button.remove();
      this.button = null;
    }
    return;
  }

    if (!this.button) {
      this.createButton();
    } else {
      this.storeSelection();
    }
    if (this.banner) {
      this.banner.remove();
      this.banner = false;
    }
  }

  hideSelectToReadefine() {
    if (this.button) {
      this.button.remove();
      this.button = false;
    }
    if (this.banner) {
      this.banner.remove();
      this.banner = false;
    }
    return
  }

  showDisabledSelectToReadefineBanner() {
    if (this.button) {
      this.button.remove();
      this.button = null;
    }
    if (!this.banner) {
      this.banner = new SelectToReadefineDisabled("Selection is too long.");
      this.banner.appendToBody();
    }
    return;
  }

  replaceSelectedText(responseData, operation, target) {
    if (responseData.exceededDailyLimit) return;
    if (responseData['readefinitions_list']) {
      for (let key in responseData['readefinitions_list']) {
        responseData['readefinitions_list'][key]['type'] = 'ai';
        responseData['readefinitions_list'][key]['aiOperation'] = operation;
        if (target) {
          responseData['readefinitions_list'][key]['aiTarget'] = target;
        }
      }

      this.readefinitionsList = Object.assign(this.readefinitionsList, responseData['readefinitions_list']);
    }
    let replacementContent;
    if (responseData.readefineMode === "learning") {
      replacementContent = responseData.readefined_original_text;
    } else {
      replacementContent = responseData.readefined_target_text;
    }

    const sel = window.getSelection();

    if (sel.rangeCount) {
      const range = sel.getRangeAt(0);
      const editableElem = this.getEditableElement(range.commonAncestorContainer);

      if (editableElem) {
        if (editableElem.nodeName === 'INPUT' || editableElem.nodeName === 'TEXTAREA') {
          const start = editableElem.selectionStart;
          const end = editableElem.selectionEnd;
          editableElem.value = editableElem.value.slice(0, start) + replacementContent + editableElem.value.slice(end);
          editableElem.setSelectionRange(start, start + replacementContent.length);
        } else if (this.isContentEditable(editableElem)) {
          this.replaceContentEditableSelection(range, replacementContent);
        }
      } else {
        this.replaceRegularSelection(range, replacementContent);
      }
    }
  }

  replaceContentEditableSelection(range, replacementContent) {
    const doc = new DOMParser().parseFromString(replacementContent, 'text/html');
    const fragment = document.createDocumentFragment();
    Array.from(doc.body.childNodes).forEach(node => {
      fragment.appendChild(node.cloneNode(true));
    });
    range.deleteContents();
    range.insertNode(fragment);
  }

  replaceRegularSelection(range, replacementContent) {
    const doc = new DOMParser().parseFromString(replacementContent, 'text/html');
    const fragment = document.createDocumentFragment();
    Array.from(doc.body.childNodes).forEach(node => {
      fragment.appendChild(node.cloneNode(true));
    });
    range.deleteContents();
    range.insertNode(fragment);
  }

  handleClick = (e) => {
    if (e.target.closest('#rdfn_def_visible')) {
      var rdfnDefApp = document.getElementById("rdfnDefAppearance");
      rdfnDefApp.classList.toggle('expanded-rdfn-def');

      var rdfnExpandOut = document.getElementById('rdfn_expand_out');
      rdfnExpandOut.classList.toggle('expanded-rdfn-def');

      var rdfnExpandIn = document.getElementById('rdfn_expand_in');
      rdfnExpandIn.classList.toggle('expanded-rdfn-def');
      return
    }
  }

  attachEventListeners() {
    document.addEventListener("click", this.handleClick);
    document.addEventListener('copy', this.handleCopy);
    document.addEventListener('mouseover', this.handleMouseOver);
    document.addEventListener("selectionchange", this.handleSelectionChange);
  }

  removeEventListeners() {
    document.removeEventListener("click", this.handleClick);
    document.removeEventListener('copy', this.handleCopy);
    document.removeEventListener('mouseover', this.handleMouseOver);
    document.removeEventListener("selectionchange", this.handleSelectionChange);
  }

  removeReadefinitions() {
    let elements = document.querySelectorAll(".readefiningAWord");
    elements.forEach(element => {
      const key = element.id.replaceAll("readefinition", "");
      const data = this.readefinitionsList[key];
      if (data) {
        const originalText = data.original;
        // Create a single text node with the original text
        const textNode = document.createTextNode(originalText);
        // Replace the span with the text node in the parent element
        if (element.parentNode) {
          element.parentNode.replaceChild(textNode, element);
        }
      }
    });
  }

  turnOff() {
    this.status = false;
    this.removeEventListeners();
    this.removeReadefinitions();
    // remove .checkedbyreadefine class from all elements
    let checkedbyreadefineclasses = document.getElementsByClassName("checkedbyreadefine");
    while (checkedbyreadefineclasses.length) {
      checkedbyreadefineclasses[0].classList.remove("checkedbyreadefine");
    }
  }

  // main run method
  collectDataAndReadefine() {
    this.attachEventListeners();
    this.launcher();
  }
}