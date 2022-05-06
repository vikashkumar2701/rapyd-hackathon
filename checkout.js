
(function () {
    
    function MockPay({amount, keyId, onSuccess, onFailure, customer, themeColor}) {
        this.amount = amount;
        this.keyId = keyId;
        this.onSuccess = onSuccess;
        this.onFailure = onFailure;
        this.customer = customer || {};
        this.themeColor = themeColor || "#EC4899";
    }
    
    const styleSheetExists = !!document.getElementById('mockpay_checkout_stylesheet');
    if (!styleSheetExists) {
        const head = document.getElementsByTagName('head')[0];
        const stylesheet = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = '../checkout.css';
        stylesheet.id = 'mockpay_checkout_stylesheet';
        head.appendChild(stylesheet);
    }

    function setValidity(node, isValid) {
        if (isValid) {
            node.classList.remove('error');
            return;
        }
        node.classList.add('error');
    }

    MockPay.prototype.open = function () {
        const body = document.getElementsByTagName('body')[0];

        const overlayExists = !!document.getElementById('mockpay_root');
        if (!overlayExists) {
            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            overlay.id = 'mockpay_root';

            const paymentCardWrapper = document.createElement('div');
            paymentCardWrapper.className = 'payment-card-wrapper';
            const paymentCard = document.createElement('div');
            paymentCard.className = 'payment-card';

            const infoDiv = document.createElement('div');
            infoDiv.className = 'payment-card-header';
         
            const header_area_container = document.createElement('div');
            header_area_container.className = 'header-area-container';

            const header_area = document.createElement('div');
            header_area.className = 'payment-card-header-container';

            
            const header_area_border = document.createElement('div');
            header_area_border.className = 'payment-card-header-logo-border';
            header_area.appendChild(header_area_border);

            const header_area_img = document.createElement('img');
            header_area_img.src = 'https://dashboard.rapyd.net/images/rapyd-logo-black.svg';
            header_area_img.className = 'payment-card-header-logo-img';
            header_area_border.appendChild(header_area_img);

            
            const header_area_title = document.createElement('div');

            header_area_title.className = 'payment-card-header-title';
            
            const header_area_companyname = document.createElement('div');
            header_area_companyname.className = 'payment-card-header-companyname';
            header_area_companyname.innerHTML = 'Rapyd';
            header_area_title.appendChild(header_area_companyname);
            const header_area_extrainfo = document.createElement('div');
            header_area_extrainfo.className = 'payment-card-header-extrainfo';
            header_area_extrainfo.innerHTML = 'ORDS134442';


            header_area_title.appendChild(header_area_extrainfo);
            
            const header_area_amount = document.createElement('div');
            header_area_amount.className = 'payment-card-header-amount';
            header_area_amount.innerHTML = 'USD ' + this.amount;
            header_area_title.appendChild(header_area_amount);

            header_area.appendChild(header_area_title);
            paymentCard.appendChild(header_area);

            const header_title = document.createElement('div');

            

            const closeButton = document.createElement('div');
            closeButton.className = 'payment-card-header-close-button';
            closeButton.innerText = 'X';
            closeButton.onclick = () => {
                document.getElementById('mockpay_root').remove();
            }

           const firstcontainer = document.createElement('div');
            // firstcontainer.className = 'payment-card-header-firstcontainer';
            firstcontainer.style.display='contents';
            firstcontainer.setAttribute('id','frame1');

            const emailcontainer = document.createElement('div');
            emailcontainer.className = 'payment-card-header-email-container';
           

            const emailicon = document.createElement('i');
            
            emailicon.className = 'fa-solid fa-envelope';
            emailicon.style.color = '#828282';
            
            emailicon.style.marginLeft= '10px';
            emailcontainer.appendChild(emailicon);

            const emailinput = document.createElement("input");
           
            emailinput.className = 'payment-card-header-mobilenumber-input';
            emailinput.setAttribute('id','emailinput');
            emailinput.autofocus = true;

            emailinput.type = "text";
            emailinput.className = "payment-card-input";
            emailinput.placeholder = "Email";
            emailcontainer.appendChild(emailinput);


         
            const mobilenumbersection = document.createElement('div');
        
            mobilenumbersection.className = 'payment-card-header-mobilenumber-section';
            mobilenumbersection.style.display="flex";

            var countrycodeslist = [];
            
            const countrycode = document.createElement("select");
            countrycode.id="countrycode";
           async function getCountryCodes() {
            const txn = await request('http://localhost:3000/countries', "GET", {});
            console.log(txn.body.data);
            countrycodeslist = txn.body.data;
            for (var i = 0; i < countrycodeslist.length; i++) {
                var iterator = document.createElement("option");
                iterator.value = countrycodeslist[i].iso_alpha2;
                iterator.text = countrycodeslist[i].phone_code +" ("+ countrycodeslist[i].iso_alpha2 +")";
                countrycode.appendChild(iterator);
            }
           }
           getCountryCodes();
                 
            countrycode.className = "payment-card-input";
          

            const phone = document.createElement("input");
            phone.type = "text";
            phone.style.width="100%";
            phone.className = "payment-card-input";
            phone.placeholder = "Enter Mobile Number";
            
            const phoneicon = document.createElement('i');
            
            phoneicon.className = 'fa-solid fa-phone';
            phoneicon.style.color = '#828282';
            phoneicon.style.marginRight = '10px';


            mobilenumbersection.appendChild(countrycode);
            mobilenumbersection.appendChild(phone);
            mobilenumbersection.appendChild(phoneicon);

            firstcontainer.appendChild(emailcontainer);
            firstcontainer.appendChild(mobilenumbersection);

            const cardNumberInput = document.createElement("input");
            cardNumberInput.placeholder = '1234 5678 9101 1213';
            cardNumberInput.autocompletetype = 'cc-number';
            cardNumberInput.onkeypress = ev => {
                const key = String.fromCharCode(ev.which);
                const shouldEscape = key.length === 1 && /[^0-9]/.test(key);
                const isNumber = key.length === 1 && /\d/.test(key)
                const isDelete = ['backspace', 'delete'].includes(key.toLowerCase());

                if (isDelete) {
                    const lastSpaceIndex = cardNumberInput.value.lastIndexOf(' ');
                    let factor = 0;
                    if (cardNumberInput.value.length - 2 === lastSpaceIndex) {
                        factor = 1
                    }
                    cardNumberInput.value = cardNumberInput.value.slice(0, cardNumberInput.value.length - factor);
                } else if (shouldEscape) {
                    ev.preventDefault();
                    return;
                } else if (isNumber) {
                    ev.preventDefault();
                    cardNumberInput.value = cardNumberInput.value.length <= 18 ? cardNumberInput.value.concat(key) : cardNumberInput.value;
                    const nextSpaceIndex = cardNumberInput.value.lastIndexOf(' ') + 5;
                    if (cardNumberInput.value.length === nextSpaceIndex && nextSpaceIndex < 19) {
                        cardNumberInput.value = cardNumberInput.value.concat(' ');
                    }
                    if (cardNumberInput.value.length === 19) {
                        expiryInput.focus();
                    }
                }
                if(cardNumberInput.value.length < 19) {
                    setValidity(cardNumberInput, false);
                    return;
                }
                setValidity(cardNumberInput, true);
            }

            const expiryCvvContainer = document.createElement("div");
            expiryCvvContainer.className = "flex justify-between";
            const expiryInput = document.createElement("input");
            expiryInput.placeholder = '02/19';
            expiryInput.className = 'flex-shrink'
            expiryInput.onkeypress = ev => {
                let key = String.fromCharCode(ev.which);
                const shouldEscape = key.length === 1 && /[^0-9]/.test(key);
                const isNumber = key.length === 1 && /\d/.test(key)
                const isDelete = ['backspace', 'delete'].includes(key.toLowerCase());

                if (isDelete) {
                    let factor = 0;
                    if (expiryInput.value.length === 4) {
                        factor = 1
                    }
                    expiryInput.value = expiryInput.value.slice(0, expiryInput.value.length - factor);
                } else if (shouldEscape) {
                    ev.preventDefault();
                    return;
                } else if (isNumber) {
                    ev.preventDefault();
                    if (parseInt(key) > 1 && expiryInput.value.length === 0) {
                        key = `0${key}`
                    }
                    expiryInput.value = expiryInput.value.length <= 4 ? expiryInput.value.concat(key) : expiryInput.value;
                    if (expiryInput.value.length === 2) {
                        expiryInput.value = expiryInput.value.concat('/');
                    }
                    if (expiryInput.value.length === 5) {
                        cvvInput.focus();
                    }
                }
                if(expiryInput.value.length < 5) {
                    setValidity(expiryInput, false);
                    return;
                }
                setValidity(expiryInput, true);
            }

            const cvvInput = document.createElement("input");
            cvvInput.placeholder = '000';
            cvvInput.className = 'flex-shrink'
            cvvInput.onkeypress = ev => {
                const key = String.fromCharCode(ev.which);
                const shouldEscape = key.length === 1 && /[^0-9]/.test(key);
                const isNumber = key.length === 1 && /\d/.test(key)
                const isDelete = ['backspace', 'delete'].includes(key.toLowerCase());

                if (isDelete) {
                    cvvInput.value = cvvInput.value.slice(0, cvvInput.value.length);
                } else if (shouldEscape) {
                    ev.preventDefault();
                    return;
                } else if (isNumber) {
                    ev.preventDefault();
                    cvvInput.value = cvvInput.value.length <= 2 ? cvvInput.value.concat(key) : cvvInput.value;
                    if (cvvInput.value.length === 3) {
                        nameInput.focus();
                    }
                }
                if(cvvInput.value.length < 3) {
                    setValidity(cvvInput, false);
                    return;
                }
                setValidity(cvvInput, true);
            };

            expiryCvvContainer.appendChild(expiryInput);
            expiryCvvContainer.appendChild(cvvInput);

            const nameInput = document.createElement("input");
            nameInput.placeholder = 'Name on card';
            nameInput.onkeypress = () => {
                if(nameInput.value.length === 0) {
                    setValidity(nameInput, false);
                    return;
                }
                setValidity(nameInput, true);
            }
            const companyname = document.createElement("div")
            companyname.innerText = 'Powered By Rapyd';
            companyname.className = 'payment-card-companyname';
            
            const proceedbtn = document.createElement("button")
            proceedbtn.innerText = 'Proceed';
            proceedbtn.className = 'pay-button';
            proceedbtn.style.backgroundColor = this.themeColor;
            proceedbtn.onclick = async () => {
               
                
                secondframe(emailinput.value, phone.value, countrycode.value );
            
                
            }






            async function secondframe(email, phone, countrycode) {
                var ccode = countrycode;
                console.log(email+" " + phone+" " + countrycode);
                var payment_methods_arr=[];
                console.log("Proceeding");
                while(secondcontainer.firstChild){
                    secondcontainer.removeChild(secondcontainer.firstChild);
                }
                if (!secondcontainer.hasChildNodes()) {
                console.log("I am here");
                const profile = document.createElement("div");
                profile.className = 'payment-profile';
                profile.onclick = (() => {
                    const thisform = document.getElementById('frame1');
                    thisform.style.display = 'block';
                    const thisform2 = document.getElementById('frame2');
                    thisform2.style.display = 'none';
                    });
                const profileimg = document.createElement("div");
                profileimg.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
                profileimg.className = 'payment-profile-img';
                profile.appendChild(profileimg);
                const profileName = document.createElement("div");
                profileName.className = 'payment-profile-name';
                profileName.innerText = email;
                const profileEmail = document.createElement("div");
                profileEmail.className = 'payment-profile-email';
    
                profileEmail.innerText = phone;
                profile.appendChild(profileName);
                profile.appendChild(profileEmail);
                secondcontainer.appendChild(profile);


               
                const choosemethods = document.createElement("div");
                          

                
                choosemethods.className = 'payment-card-companyname';
                secondcontainer.appendChild(choosemethods);
                const paymentmethodsContainer = document.createElement("div");
                paymentmethodsContainer.className = 'payment-methods-container';
               


                payment_methods_names_X =["Card", "eWallet", "Cash", "Bank Transfer", "Bank Redirect"];

                for (var i = 0; i < payment_methods_names_X.length; i++) {
                   let name = payment_methods_names_X[i];
                   console.log(name);
                     window['p'+i]= document.createElement("div");
                     window['p'+i].className = 'payment-methods-cards';
                     window['p'+i].id= name;
                     window['p'+i].innerHTML = payment_methods_names_X[i];
                    paymentmethodsContainer.appendChild( window['p'+i]);
                    window['p'+i].onclick = (() => {
                        const thisform = document.getElementById('frame1');
                        thisform.style.display = 'none';
                        const thisform2 = document.getElementById('frame2');
                        thisform2.style.display = 'none';
                        const thisform3 = document.getElementById('frame3');
                        thisform3.style.display = 'block';

                        thirdframe(name,ccode, card_store, eWallet_store, Cash_store, Bank_Transfer_store, Bank_Redirect_store);
                        }
                    );

                }
                secondcontainer.appendChild(paymentmethodsContainer);
              
                
            }
            const paymentmethods = await request('http://localhost:3000/FetchPaymentMethods/'+countrycode, "GET", {});
            let card_store = [];
            let eWallet_store = [];
            let Cash_store = [];
            let Bank_Transfer_store = [];
            let Bank_Redirect_store = [];
          
            console.log(paymentmethods.body.data);
                
            paymentmethods.body.data.forEach(element => {
                if(element.category=="card"){
                    card_store.push(element);
                }
                if(element.category=="ewallet"){
                    eWallet_store.push(element);
                }
                if(element.category=="cash"){
                    Cash_store.push(element);
                }
                if(element.category=="bank_transfer"){
                    Bank_Transfer_store.push(element);
                }
                if(element.category=="bank_redirect"){
                    Bank_Redirect_store.push(element);
                }
            });

            
           
            const thisform = document.getElementById('frame1');
            thisform.style.display = 'none';
            const thisform2 = document.getElementById('frame2');
            thisform2.style.display = 'block';

            }


            async function thirdframe(payment_methods_name, countrycode, card_store, eWallet_store, Cash_store, Bank_Transfer_store, Bank_Redirect_store) {
                console.log(countrycode);
               
               


                console.log(payment_methods_name);
               
                
                console.log(payment_methods_name);
                var payment_methods_arr_load = [];
                if(payment_methods_name=="Card"){
                    payment_methods_arr_load = card_store;
                }
                if(payment_methods_name=="eWallet"){
                    payment_methods_arr_load = eWallet_store;
                }
                if(payment_methods_name=="Cash"){
                    payment_methods_arr_load = Cash_store;
                }
                if(payment_methods_name=="Bank Transfer"){
                    payment_methods_arr_load = Bank_Transfer_store;
                }
                if(payment_methods_name=="Bank Redirect"){
                    payment_methods_arr_load = Bank_Redirect_store;
                }

                const paymentmethods_cards_load = document.createElement("div");

                paymentmethods_cards_load.className = 'payment-methods-cards-load';
                
                

                payment_methods_arr_load.forEach(element => {
                   
                    const payment_icon = document.createElement("div");
                    payment_icon.className = 'payment-icon';
                    payment_icon.innerHTML = '<img src="'+element.image+'" alt="" class="payment-card-image-load">';
                    paymentmethods_cards_load.appendChild(payment_icon);
                    // const payment_card_name = document.createElement("div");
                    // payment_card_name.className = 'payment-card-name';
                    // payment_card_name.innerText = element.name;
                    // paymentmethods_cards_load.appendChild(payment_card_name);
                  
                    

                    console.log(element);
                });
                 while (thirdcontainer.firstChild) {
                    thirdcontainer.removeChild(thirdcontainer.firstChild);
                 }
                 const backbtn = document.createElement("div");
                 backbtn.className = 'back-button';
                 
                 backbtn.innerHTML = '<i class="fa fa-arrow-left" aria-hidden="true"></i>Back';
                 
                 backbtn.style.backgroundColor = this.themeColor;
                 backbtn.onclick = (() => {
                     const thisform = document.getElementById('frame1');
                     thisform.style.display = 'none';
                     const thisform2 = document.getElementById('frame2');
                     thisform2.style.display = 'block';
                     const thisform3 = document.getElementById('frame3');
                     thisform3.style.display = 'none';
                 });
                 thirdcontainer.appendChild(backbtn);
                thirdcontainer.appendChild(paymentmethods_cards_load);
                console.log(payment_methods_arr_load);


            }







            const payButton = document.createElement("button")
            payButton.innerText = 'Pay Now';
            payButton.className = 'pay-button';
            payButton.style.backgroundColor = this.themeColor;

            // convert rgb values from hex to decimal
            const r = parseInt(this.themeColor.slice(1, 3), 16);
            const g = parseInt(this.themeColor.slice(3, 5), 16);
            const b = parseInt(this.themeColor.slice(5, 8), 16);

            // calculate brightness of the color
            const luminosity = (r * 0.299 + g * 0.587 + b * 0.114);

            if (luminosity > 186) {
                payButton.style.color = 'black';
            } else {
                payButton.style.color = 'white';
            }
            payButton.onclick = async () => {
                const cardNumber = cardNumberInput.value.replace(/\s/g, '');
                if (cardNumber.length < 16 || expiryInput.value.length < 5 || cvvInput.value.length < 3 || nameInput.value.length === 0) {
                    return;
                }
                loadingOverlay.classList.remove('hide');
                try {
                    const txn = await request('https://domain.com/transactions/initiate/', "POST", {
                        "amount": this.amount,
                        "api_key": this.keyId,
                        "customer": this.customer
                    });
                    window.open(txn.authorization_url, '_blank');
                    const data = await pollTransactionStatus(txn["txn_id"], this.keyId);
                    if (data["status"] === "success") {
                        this.onSuccess(data);
                    } else {
                        this.onFailure(data);
                    }
                } catch (e) {
                    this.onFailure(e);
                } finally {
                    document.getElementById('mockpay_root').remove();
                }
            }

            const gapDiv = document.createElement("div");
            gapDiv.className = "flex-1";


      
         
            header_area.appendChild(closeButton);
            paymentCard.appendChild(header_area_container);
            
            paymentCard.appendChild(infoDiv);
            firstcontainer.appendChild(gapDiv);
            firstcontainer.appendChild(companyname);
            firstcontainer.appendChild(proceedbtn);
            paymentCard.appendChild(firstcontainer);

          
            const secondcontainer = document.createElement('div');
            
            secondcontainer.style.display='contents';
            secondcontainer.setAttribute('id','frame2');
           
          
            secondcontainer.style.display = 'none';
           
            
            paymentCard.appendChild(secondcontainer);

            const thirdcontainer = document.createElement('div');
            thirdcontainer.innerHTML = 'Preferred Payment Method';
            

            thirdcontainer.style.display='none';
            thirdcontainer.setAttribute('id','frame3');
     
            paymentCard.appendChild(thirdcontainer);
          


            
            // const checkoutDiv = document.createElement("div");
            // checkoutDiv.id = "rapyd-checkout";
            // secondcontainer.appendChild(checkoutDiv);
            // checkout.displayCheckout();

            // paymentCard.appendChild(mobilenumbersection);
          
            // paymentCard.appendChild(cardNumberInput);
            // paymentCard.appendChild(expiryCvvContainer);
            // paymentCard.appendChild(nameInput);
       
         
            

            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'loading hide';
            const loadingGif = document.createElement('img');
            loadingGif.src = "../loading_animation.gif";
            loadingGif.className = "loading-animation";
            const loadingText = document.createElement('p');
            loadingText.style.color = 'black';
            loadingText.innerText = 'Processing Transaction';
            loadingOverlay.appendChild(loadingGif);
            loadingOverlay.appendChild(loadingText);

            paymentCardWrapper.appendChild(paymentCard);
            paymentCardWrapper.appendChild(loadingOverlay);
            overlay.appendChild(paymentCardWrapper);
            body.appendChild(overlay);

            cardNumberInput.autofocus = true;
        }
    }

    function request(url, method, data) {
        return new Promise((resolve, reject) => {
            const xmlHttpRequest = new XMLHttpRequest();
            xmlHttpRequest.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    resolve(JSON.parse(this.responseText))
                } else if ([400, 403, 500].includes(this.status) && this.readyState === 4) {
                    reject(JSON.parse(this.responseText))
                }
            }
            xmlHttpRequest.open(method, url);
            xmlHttpRequest.setRequestHeader('Content-Type', 'application/json');
            if (method === "POST") {
                xmlHttpRequest.send(JSON.stringify(data));
            } else {
                xmlHttpRequest.send();
            }
        })
    }

    function pollTransactionStatus(txnId, apiKey) {
        return new Promise(resolve => {
            const poll = setInterval(() => {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        const data = JSON.parse(this.responseText);
                        if (["success", "failed"].includes(data["status"])) {
                            clearInterval(poll);
                            resolve(data);
                        }
                    }
                }
                xhr.open("POST", `https://domain.com/transactions/${txnId}/status/`);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(
                    JSON.stringify({
                        "api_key": apiKey
                    })
                );
            }, 1000);
        })
    }

    window.MockPay = MockPay;
})()
