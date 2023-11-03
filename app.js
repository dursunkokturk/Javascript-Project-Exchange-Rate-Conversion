const api_key = "3547e883efb081762e0e097d";
const url = "https://v6.exchangerate-api.com/v6/" + api_key;

// elements
// Ceviri Isleminin Yapildigi Para Birimini Seciyoruz
const currency_one = document.getElementById("currency_one");

// Cevirilecek Para Birimini Seciyoruz
const currency_two = document.getElementById("currency_two");

// Para Birimi Listesini Seciyoruz
const list_one = document.getElementById("list_one");

// Para Birimi Listesini Seciyoruz
const list_two = document.getElementById("list_two");

// Cevirisi Yapilacak Miktarin Girildigi Input Alanini Seciyoruz
const amount = document.getElementById("amount");

// Ceviri Isleminin Yapilmasi Icin Butonu Seciyoruz
const calculate = document.getElementById("calculate");

const result = document.getElementById("result");

fetch(url + "/codes")

    // Ceviri Isleminin Yapilmasi Icin Para Biriminin Oldugu Listeyi Aliyoruz
    // Gelen Data yi Object Haline Ceviriyoruz
    .then(response => response.json())

    // Object Haline Getirilen Data nin Icinde Geziyoruz 
    .then(data => {

        // Data Icindeki Para Birimlerine Ulasmak Icin
        // Object Icindeki supported_codes Ozelligi Icinde Geziyoruz
        const items = data.supported_codes;
        
        let options;
        for(let item of items) {

            // Alinan Liste Icindeki Para Biriminin Kisa Adi ve  
            // Para Biriminin Uzun Adini Yazdiriyoruz
            options += `<option value=${item[0]}>${item[1]}</option>`;    
        }

        // Alinan Liste Icindeki Para Birimi Bilgilerini Ekrana Yazdiriyoruz
        list_one.innerHTML = options;

        // Alinan Liste Icindeki Para Birimi Bilgilerini Ekrana Yazdiriyoruz
        list_two.innerHTML = options;
    });

calculate.addEventListener("click", function(){

    // Ilk Secilen Para Birimini Aliyoruz
    const exchange1 = currency_one.value;

    // Ikinci Secilen Para Birimini Aliyoruz
    const exchange2 = currency_two.value;

    // Ceviri Isleminin Yapilacagi Miktari Aliyoruz
    const amount_money = amount.value;

    fetch(url + "/latest/" + exchange1)
        .then(res => res.json())
        .then(data => {
            const translate_result = (data.conversion_rates[exchange2] * amount_money).toFixed(3);
            console.log(result);
            result.innerHTML = `
                <div class="card border-primary">
                    <div class="card-body text-center" style="font-size:30px;" >
                        ${amount_money} ${exchange1} = ${translate_result} ${exchange2}
                    </div>
                </div>
            `;
        })
});