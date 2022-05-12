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

            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'loading hide';
            const loadingGif = document.createElement('img');
            loadingGif.src = "../rocket.gif";
            loadingGif.className = "loading-animation";
            const loadingText = document.createElement('p');
            loadingText.style.color = 'black';
            loadingText.innerText = 'Processing...';
            loadingOverlay.appendChild(loadingGif);
            loadingOverlay.appendChild(loadingText);
            paymentCardWrapper.appendChild(loadingOverlay);

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





            const customernamecontainer = document.createElement('div');
            customernamecontainer.className = 'payment-card-header-email-container';
           

            const customernamecontainericon = document.createElement('i');
            
            customernamecontainericon.className = 'fa-solid fa-user';
            customernamecontainericon.style.color = '#828282';
            
            customernamecontainericon.style.marginLeft= '10px';
            customernamecontainer.appendChild(customernamecontainericon);

            const customernameinput = document.createElement("input");
           
            customernameinput.className = 'payment-card-header-mobilenumber-input';
            customernameinput.setAttribute('id','customernameinput');
         

            customernameinput.type = "text";
            customernameinput.className = "payment-card-input";
            customernameinput.placeholder = "Enter Your Name";
            customernamecontainer.appendChild(customernameinput);


         
            const mobilenumbersection = document.createElement('div');
        
            mobilenumbersection.className = 'payment-card-header-mobilenumber-section';
            mobilenumbersection.style.display="flex";

            var countrycodeslist = [];
            
            const countrycode = document.createElement("select");
            countrycode.id="countrycode";

           async function getCountryCodes() {
            loadingOverlay.classList.remove('hide');
            const txn = await request('http://localhost:3000/countries', "GET", {});
            console.log(txn.body.data);
            countrycodeslist = txn.body.data;
            for (var i = 0; i < countrycodeslist.length; i++) {
                var iterator = document.createElement("option");
                if(countrycodeslist[i].phone_code == 91){

                    iterator.setAttribute("selected", "selected");
                }
                iterator.value = countrycodeslist[i].iso_alpha2 +" "+ countrycodeslist[i].currency_code + " "+ countrycodeslist[i].phone_code;
                iterator.text = countrycodeslist[i].phone_code +" ("+ countrycodeslist[i].iso_alpha2 +")";
                countrycode.appendChild(iterator);
            }
            loadingOverlay.classList.add('hide');
           }
           
           getCountryCodes();
           

                 
            countrycode.className = "payment-card-input";
          

            const phone = document.createElement("input");
            phone.type = "text";
            phone.style.width="100%";
            phone.value="6205836061"
            phone.className = "payment-card-input";
            phone.placeholder = "Enter Mobile Number";
            
            const phoneicon = document.createElement('i');
            
            phoneicon.className = 'fa-solid fa-phone';
            phoneicon.style.color = '#828282';
            phoneicon.style.marginRight = '10px';


            mobilenumbersection.appendChild(countrycode);
            mobilenumbersection.appendChild(phone);
            mobilenumbersection.appendChild(phoneicon);
            firstcontainer.appendChild(customernamecontainer);
            firstcontainer.appendChild(emailcontainer);
            firstcontainer.appendChild(mobilenumbersection);
     
            const companyname = document.createElement("div")
            companyname.innerText = 'Powered By Rapyd';
            companyname.className = 'payment-card-companyname';
            
            const proceedbtn = document.createElement("button")
            proceedbtn.innerText = 'Proceed';
            proceedbtn.className = 'pay-button';
            proceedbtn.setAttribute('id','absbtn');
            proceedbtn.style.backgroundColor = this.themeColor;
            proceedbtn.onclick = async () => {
               
                
                afterfirstframe(emailinput.value, phone.value, countrycode.value, customernameinput.value, this.amount);
                // overview(emailinput.value, phone.value, countrycode.value, customernameinput.value, this.amount);
                
            }


            async function afterfirstframe(email,phone, countrycode, customername, amount) {
                const mycountrycodearr = countrycode.split(" ");
                console.log(mycountrycodearr);
                const thisform = document.getElementById('frame1');
                thisform.style.display = 'none';
                const thisform2 = document.getElementById('frame2');
                thisform2.style.display = 'block';
                
                console.log(email+" " + phone+" " + mycountrycodearr[0]+ " " + mycountrycodearr[1]+ " " + customername+ " " + amount);
                var payment_methods_arr=[];
                console.log("Proceeding");
                while(thisform2.firstChild){
                    thisform2.removeChild(thisform2.firstChild);
                }
                loadingOverlay.classList.remove('hide');
                const sendOtp = await request('http://localhost:3000/sendotp/'+ mycountrycodearr[2] +'/number/'+ phone, "GET", {});
                loadingOverlay.classList.add('hide');
                const accesskey = sendOtp.token;
                console.log(accesskey);
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
                thisform2.appendChild(profile);
                
                
                const check_if_address_exist = await fetch(`http://localhost:3000/checkifexist/`+mycountrycodearr[2]+'/number/'+phone, {});
                // console.log(check_if_address_exist.status);
                if(check_if_address_exist.status === 200) {
                    const messagebox = document.createElement("div");
                    messagebox.className = 'otp-container';
                    const verifymobilenumber = document.createElement("div");
                    verifymobilenumber.className = 'verifymobilenumber';
                    const verifymobilenumbertext = document.createElement("div");
                    const imptext = document.createElement("div");
                    imptext.innerText = "To use your saved addresses, enter the OTP sent to +" + mycountrycodearr[2] + phone;
                    imptext.className = 'imptext';
                    verifymobilenumbertext.appendChild(imptext);
                    const otparea = document.createElement("div");
                    otparea.className = 'otp-area';

                    const getotp = document.createElement("input");
                    getotp.type = "text";
                    getotp.className = 'payment-card-input';
                    getotp.placeholder = "Enter OTP";
                    const getotpbtn = document.createElement("button");
                    getotpbtn.setAttribute('id','primary');
                    getotpbtn.innerText = "Verify";
                    getotpbtn.onclick = async () => {
                    const otp = getotp.value;
                    var myHeaders = new Headers();
                    myHeaders.append("x-access-key", accesskey);
                    myHeaders.append("Content-Type", "application/json");
                    var raw = JSON.stringify({
                    "otp": getotp.value,
                    "countrycode": mycountrycodearr[2],
                    "number": phone
                    });

                    var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                    };

                let resp = await fetch("http://localhost:3000/verifyotp", requestOptions)
                resp = await resp.json();
                console.log(resp.status);
                if(resp.status==="true"){
                    const address = resp.address;
                    
                    alert(resp.message);
                    addressframe(email, phone, countrycode, customername, amount, address);
                }
                else{
                    alert(resp.message);
                }

                
                                        

                    }
                    const getskipbtn = document.createElement("button");
                    getskipbtn.className = 'button-8';
                    getskipbtn.innerText = "Skip";
                    getskipbtn.onclick = async () => {
                    }
                    otparea.appendChild(getotp);
                    otparea.appendChild(getotpbtn);
                    otparea.appendChild(getskipbtn);
                    verifymobilenumber.appendChild(verifymobilenumbertext);
                    verifymobilenumber.appendChild(otparea);
              
                    messagebox.appendChild(verifymobilenumber);
                    
                   
                 
                    thisform2.appendChild(messagebox);
                }
                else{


                }
               


            }

            async function addressframe(email,phone, countrycode, customername, amount, address) {

                console.log(email+" " + phone+" " + countrycode+ " " + customername+ " " + amount+ " " + address);
                const mycountrycodearr = countrycode.split(" ");
                console.log(mycountrycodearr);
                const thisform = document.getElementById('frame1');
                thisform.style.display = 'none';
                const thisform2 = document.getElementById('frame2');
                thisform2.style.display = 'block';
                while(thisform2.firstChild){
                    thisform2.removeChild(thisform2.firstChild);
                }
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
                thisform2.appendChild(profile);
                const addresscontainer = document.createElement("div");
                
                for(let i=0;i<address.length;i++){
                    const addressbox = document.createElement("div");
                    addressbox.className = 'address-box';
                    addressbox.setAttribute('id', address[i]._id);
                    const addressboxtext = document.createElement("div");
                    addressboxtext.className = 'address-box-text';
                    

                    addressboxtext.innerText = address[i].Address1 + "," + address[i].Address2+ "," + address[i].City + ", "+ address[i].State + ", " +address[i].Country + ", "+ address[i].PinCode;



                    const addressboxbtn = document.createElement("button");
                    
                    addressboxbtn.className = 'button-8';
                    addressboxbtn.innerText = "Select";
                    addressboxbtn.onclick = (() => {
                        console.log(address[i]._id);

                        overview(email, phone, countrycode, customername, amount, address[i]._id, address[i].Address1, address[i].Address2, address[i].City, address[i].State, address[i].Country, address[i].PinCode, address);
                        // secondframe(email, phone, countrycode, customername, amount, address[i]._id, address[i].Address1, address[i].Address2, address[i].City, address[i].State, address[i].Country, address[i].PinCode, address);
                    });
                    const editaddressbtn = document.createElement("button");
                    editaddressbtn.className = 'button-8';
                    editaddressbtn.innerText = "Edit";
                    editaddressbtn.onclick = (() => {
                        alert("Editing address");
                    });
                    const deleteaddressboxbtn = document.createElement("button");
                    deleteaddressboxbtn.className = 'button-62';
                    deleteaddressboxbtn.innerText = "Delete";
                    deleteaddressboxbtn.onclick = (() => {
                        let headersList = {
                            "Content-Type": "application/json"
                           }
                           
                           let bodyContent = JSON.stringify({
                               "phone" : mycountrycodearr[2]+phone,
                               "id" : address[i]._id
                           });
                           
                           fetch("https://rapyduser.herokuapp.com/deleteAddress", { 
                             method: "POST",
                             body: bodyContent,
                             headers: headersList
                           }).then(function(response) {
                            
                             const deletedarea = document.getElementById(address[i]._id);
                             deletedarea.remove();
                             return response.text();
                           }).then(function(data) {
                             console.log(data);
                           })

                    });
                    
                    addressbox.appendChild(addressboxtext);
                    addressbox.appendChild(addressboxbtn);
                    addressbox.appendChild(deleteaddressboxbtn);

                    addresscontainer.appendChild(addressbox);

                }
                thisform2.appendChild(addresscontainer);








            }

            async function overview(email, phone, countrycode, customername, amount, addressid, address1, address2, city, state, country, pin, addresses) {

                console.log(email+" " + phone+" " + countrycode+ " " + customername+ " " + amount+ " " + addressid+ " " + address1+ " " + address2+ " " + city+ " " + state+ " " + country+ " " + pin + " " + addresses);
                const thisform = document.getElementById('frame1');
                thisform.style.display = 'none';
                const thisform2 = document.getElementById('frame2');
                thisform2.style.display = 'block';
                while(thisform2.firstChild){
                    thisform2.removeChild(thisform2.firstChild);
                }
               const contactdetails = document.createElement("div");
                contactdetails.className = 'contact-details';
                const contactdetailstextwrapper = document.createElement("div");
                contactdetailstextwrapper.className = 'contact-details-text-wrapper';
                const contactdetailstext = document.createElement("div");
                contactdetailstext.className = 'contact-details-text';
                const contactdetailsfavicon = document.createElement("div");
                contactdetailsfavicon.className = 'contact-details-favicon';
                contactdetailsfavicon.innerHTML = '<i class="fa-solid fa-user"></i>';
                const contactdetailsname = document.createElement("div");
                contactdetailsname.className = 'contact-details-name';
                contactdetailsname.innerText = "Contact Details";
                contactdetailstext.appendChild(contactdetailsfavicon);
                contactdetailstext.appendChild(contactdetailsname);

                const edit_contact = document.createElement("div");
                edit_contact.className = 'edit-contact';
                const edit_contact_buton = document.createElement("button");
                edit_contact_buton.className = 'button-8';
                edit_contact_buton.innerText = "Edit / Change";
                edit_contact_buton.onclick = (() => {
                    const thisform = document.getElementById('frame1');
                    thisform.style.display = 'block';
                    const thisform2 = document.getElementById('frame2');
                    thisform2.style.display = 'none';
                });

                edit_contact.appendChild(edit_contact_buton);


                


                contactdetailstextwrapper.appendChild(contactdetailstext);
                contactdetailstextwrapper.appendChild(edit_contact);
                contactdetails.appendChild(contactdetailstextwrapper);

                const email_provided = document.createElement("div");
                email_provided.className = 'email-provided';
                const email_providedtext = document.createElement("div");
                email_providedtext.className = 'email-provided-text';
                const email_providedfavicon = document.createElement("div");
                email_providedfavicon.className = 'email-provided-favicon';
                email_providedfavicon.innerHTML = '<i class="fa-solid fa-envelope"></i>';
                const email_providedname = document.createElement("div");
                email_providedname.className = 'email-provided-name';
                email_providedname.innerText = email;
                email_providedtext.appendChild(email_providedfavicon);
                email_providedtext.appendChild(email_providedname);
                email_provided.appendChild(email_providedtext);



                const phone_provided = document.createElement("div");
                phone_provided.className = 'phone-provided';
                const phone_providedtext = document.createElement("div");
                phone_providedtext.className = 'phone-provided-text';
                const phone_providedfavicon = document.createElement("div");
                phone_providedfavicon.className = 'phone-provided-favicon';
                phone_providedfavicon.innerHTML = '<i class="fa-solid fa-phone"></i>';
                const phone_providedname = document.createElement("div");
                phone_providedname.className = 'phone-provided-name';
                phone_providedname.innerText = phone;
                phone_providedtext.appendChild(phone_providedfavicon);
                phone_providedtext.appendChild(phone_providedname);
                phone_provided.appendChild(phone_providedtext);
                contactdetails.appendChild(email_provided);
            contactdetails.appendChild(phone_provided);



                
            const address_provided_wrapper = document.createElement("div");
            address_provided_wrapper.className = 'address-provided-wrapper';

                const address_header = document.createElement("div");
                address_header.style = 'display:flex;justify-content:space-between';

               
                const address_header_container = document.createElement("div");
                address_header_container.className = 'address-header-container';

                const address_headerfavicon = document.createElement("div");
                address_headerfavicon.className = 'address-header-favicon';
                address_headerfavicon.innerHTML = '<i class="fa-solid fa-map-marker-alt"></i>';


                const address_headername = document.createElement("div");
                address_headername.className = 'address-header-name';
                address_headername.innerText = "Address";

                address_header_container.appendChild(address_headerfavicon);
                address_header_container.appendChild(address_headername);

                const address_header_edit = document.createElement("div");
                address_header_edit.className = 'address-header-edit';
                
                const address_header_edit_button = document.createElement("button");
                address_header_edit_button.className = 'button-8';
                address_header_edit_button.innerText = "Edit / Change";
                address_header_edit_button.onclick = (() => {
                    const thisform = document.getElementById('frame1');
                    thisform.style.display = 'block';
                    const thisform2 = document.getElementById('frame2');
                    thisform2.style.display = 'none';
                });

                address_header_edit.appendChild(address_header_edit_button);

                address_header.appendChild(address_header_container);
                address_header.appendChild(address_header_edit);
              

                const address_complete = document.createElement("div");
                address_complete.className = 'address-complete';
              
                const address_line_1 = document.createElement("div");
                address_line_1.className = 'address-line-1';
                address_line_1.innerHTML = address1 + ", " + address2;

                

                const address_line_3_container = document.createElement("div");
                address_line_3_container.style = 'display:flex;justify-content:space-between;';
                const address_line_3 = document.createElement("div");
                address_line_3.className = 'address-line-3';
                address_line_3.innerHTML = "City: " + city;

                const address_line_4 = document.createElement("div");
                address_line_4.className = 'address-line-4';
                address_line_4.innerHTML = "State: " + state;

                const address_line_5_wrapper = document.createElement("div");
                address_line_5_wrapper.style = 'display:flex;justify-content:space-between;';

                const address_line_5 = document.createElement("div");
                address_line_5.className = 'address-line-5';
                address_line_5.innerHTML = "Country: " + country;

                const address_line_6 = document.createElement("div");
                address_line_6.className = 'address-line-6';
                address_line_6.innerHTML = "Pin: " + pin;

                address_line_5_wrapper.appendChild(address_line_5);
                address_line_5_wrapper.appendChild(address_line_6);


                address_line_3_container.appendChild(address_line_3);
                address_line_3_container.appendChild(address_line_4);


                address_complete.appendChild(address_line_1);
               
                address_complete.appendChild(address_line_3_container);
                address_complete.appendChild(address_line_5_wrapper);


                



                
                address_provided_wrapper.appendChild(address_header);
                address_provided_wrapper.appendChild(address_complete);



                const order_wrapper = document.createElement("div");
                order_wrapper.className = 'order-wrapper';

                const order_header = document.createElement("div");
                order_header.className = 'order-header';
                order_header.innerText = "Order Summary";

                order_wrapper.appendChild(order_header);

                var discount = 0;
                var total = amount-discount;
                const order_details = document.createElement("div");
                order_details.className = 'order-details';


                const originalprice_container = document.createElement("div");
                originalprice_container.style = 'display:flex;justify-content:space-between;';

                const originalprice = document.createElement("div");
                originalprice.className = 'original-price';

                
                originalprice.innerText = "Original Price";

                const originalprice_value = document.createElement("div");
                originalprice_value.className = 'original-price-value';
                originalprice_value.innerText = amount;

                originalprice_container.appendChild(originalprice);
                originalprice_container.appendChild(originalprice_value);


                const discount_container = document.createElement("div");
                discount_container.style = 'display:flex;justify-content:space-between;';
                const discount_div = document.createElement("div");
                discount_div.className = 'discount';
                discount_div.innerText = "Discount";

                const discount_value = document.createElement("div");
                discount_value.className = 'discount-value';
                discount_value.innerText = discount;

                discount_container.appendChild(discount_div);
                discount_container.appendChild(discount_value);

                const final_container = document.createElement("div");
                final_container.style = 'display:flex;justify-content:space-between;';

                const finalprice = document.createElement("div");
                finalprice.className = 'final-price';
                finalprice.innerText = "Final Price";

                const finalprice_value = document.createElement("div");
                finalprice_value.className = 'final-price-value';
                finalprice_value.innerText = total;

                final_container.appendChild(finalprice);
                final_container.appendChild(finalprice_value);

                const paybutton = document.createElement("button");
                paybutton.className = 'pay-button';
                paybutton.id = 'absbtn';
                paybutton.innerText = "Pay";
                paybutton.onclick = (() => {
                    const thisform = document.getElementById('frame1');
                    thisform.style.display = 'none';
                    const thisform2 = document.getElementById('frame2');
                    thisform2.style.display = 'block';
                }
                );


                
                order_details.appendChild(originalprice_container);
                order_details.appendChild(discount_container);
                order_details.appendChild(final_container);
                order_wrapper.appendChild(order_details);
                







               





                thisform2.appendChild(contactdetails);
                thisform2.appendChild(address_provided_wrapper);
                thisform2.appendChild(order_wrapper);
                thisform2.appendChild(paybutton);
              
            }



            async function secondframe(email, phone, countrycode, customername, amount) {
                
                const mycountrycodearr = countrycode.split(" ");
                console.log(email+" " + phone+" " + mycountrycodearr[0]+ " " + mycountrycodearr[1]+ " " + customername+ " " + amount);
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

                        thirdframe(name,mycountrycodearr[0], card_store, eWallet_store, Cash_store, Bank_Transfer_store, Bank_Redirect_store, email, phone, customername, mycountrycodearr[1], amount);
                        }
                    );

                }
                secondcontainer.appendChild(paymentmethodsContainer);
              
                
            }
            loadingOverlay.classList.remove('hide');
            const paymentmethods = await request('http://localhost:3000/FetchPaymentMethods/'+mycountrycodearr[0], "GET", {});
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
            loadingOverlay.classList.add('hide');
            
           
            const thisform = document.getElementById('frame1');
            thisform.style.display = 'none';
            const thisform2 = document.getElementById('frame2');
            thisform2.style.display = 'block';

            }


            async function thirdframe(payment_methods_name, countrycode, card_store, eWallet_store, Cash_store, Bank_Transfer_store, Bank_Redirect_store, email, phone, customername, currency, amount) {
                console.log(countrycode+ " " +currency);
               
               


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
                    
                    let name = element.type;

                    const loaderspecific_methods = document.createElement("div");
                    loaderspecific_methods.className = 'payment-icon';
                 
                    loaderspecific_methods.id = name;
                    loaderspecific_methods.innerHTML = '<img src="'+element.image+'" alt="" class="payment-card-image-load">';
                    loaderspecific_methods.onclick = (() => {
                        
                        forthframe(payment_methods_name, email, phone, name, customername, countrycode, currency, amount);
                    });
                    paymentmethods_cards_load.appendChild(loaderspecific_methods);
                               

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

            async function forthframe(payment_methods_name, email, phone, paymentid, customername, countrycode, currency, amount) {

                const thisform = document.getElementById('frame1');
                thisform.style.display = 'none';
                const thisform2 = document.getElementById('frame2');
                thisform2.style.display = 'none';
                const thisform3 = document.getElementById('frame3');
                thisform3.style.display = 'none';
                const thisform4 = document.getElementById('frame4');
                thisform4.style.display = 'block';
                while(forthcontainer.firstChild){
                    forthcontainer.removeChild(forthcontainer.firstChild);
                }
                    console.log(payment_methods_name+ " " + email + " " + phone + " " + paymentid + " " + customername + " " + countrycode + " " + currency + " " + amount);
                    const backbtn = document.createElement("div");
                    backbtn.className = 'back-button';
                    
                    backbtn.innerHTML = '<i class="fa fa-arrow-left" aria-hidden="true"></i>Back';
                    
                    backbtn.style.backgroundColor = this.themeColor;
                    backbtn.onclick = (() => {
                        const thisform = document.getElementById('frame1');
                        thisform.style.display = 'none';
                        const thisform2 = document.getElementById('frame2');
                        thisform2.style.display = 'none';
                        const thisform3 = document.getElementById('frame3');
                        thisform3.style.display = 'block';
                        const thisform4 = document.getElementById('frame4');
                        thisform4.style.display = 'none';
                    });
                   
                    let currentepochtime =  Math.floor( new Date().getTime() / 1000 )+5000;
                    console.log(currentepochtime);
                    let sendpostrequest = await fetch('http://localhost:3000/checkout', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },

                       
                        body: JSON.stringify({
                            
                                "amount": amount,
                                "complete_payment_url": "http://example.com/complete",
                                "country": countrycode,
                                "currency": currency,
                                // "requested_currency": "USD",
                               
                                "error_payment_url": "http://example.com/error",
                                "merchant_reference_id": "950ae8c6-78",
                                "language": "en",
                                "metadata": {
                                    "merchant_defined": true
                                },
                                "payment_method_types_include": [
                                    paymentid
                                ],
                                
                                "payment_method_types_exclude": []
                            
                        })
                    });
                    const json_start_checkout = await sendpostrequest.json();
                    console.log(json_start_checkout.body);

                    window.open(json_start_checkout.body.data.redirect_url, "popup", "width=500,height=500");
                    const fetchrequiredfields = await request('http://localhost:3000/requiredfields/'+paymentid, "GET", {});

                    console.log(fetchrequiredfields.body.data);
                    forthcontainer.appendChild(backbtn);
                    loadingOverlay.classList.remove('hide');
                    pollTransactionStatus(json_start_checkout.body.data.id);
                    // forthcontainer.appendChild(checkout_iframe);
                    loadingOverlay.classList.add('hide');

            };





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

            const forthcontainer = document.createElement('div');
            forthcontainer.style.display='none';
            forthcontainer.setAttribute('id','frame4');
            paymentCard.appendChild(forthcontainer);

          


            
            // const checkoutDiv = document.createElement("div");
            // checkoutDiv.id = "rapyd-checkout";
            // secondcontainer.appendChild(checkoutDiv);
            // checkout.displayCheckout();

            // paymentCard.appendChild(mobilenumbersection);
          
            // paymentCard.appendChild(cardNumberInput);
            // paymentCard.appendChild(expiryCvvContainer);
            // paymentCard.appendChild(nameInput);
       
         
            

          

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

    function pollTransactionStatus(checkoutid) {
        return new Promise(resolve => {
            const poll = setInterval(() => {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        const body = JSON.parse(this.responseText);
                        console.log(body.body.data.payment.captured);
                        var status = body.body.data.payment.captured;
                        if (status){
                            console.log("I am here");
                            clearInterval(poll);
                            resolve(body.body.data.payment);
                            
                        }
                    }
                }
                xhr.open("GET", `http://localhost:3000/checkout/${checkoutid}`);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send();
            }, 3000);
        })
    }

    window.MockPay = MockPay;
})()
