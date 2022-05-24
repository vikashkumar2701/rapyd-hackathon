(function () {
    
    function MockPay({amount, keyId, onSuccess, onFailure, customer, themeColor, currency_user_defined, business_icon, business_title}) {
        this.amount = amount;
        this.keyId = keyId;
        this.onSuccess = onSuccess;
        this.onFailure = onFailure;
        this.business_icon = business_icon || "https://dashboard.rapyd.net/images/rapyd-logo-black.svg";
        this.business_title = business_title || "Rapyd";

        this.currency_user_defined = currency_user_defined || 'USD';
        currency_user_definedx = currency_user_defined;
        customerx = customer || {};

        console.log(customer);
        this.themeColor = themeColor || "#EC4899";
        addresses_global = [];
        countriesdata_global = [];
        
        customer_name_global = "";
        customer_email_global = "";

        customer_phone_global = "";
        customer_country_code_global = "";

        customer_billing_name_global = "";

        customer_billing_phone_global = "";
        customer_billing_countrycode_global = "";

        customer_billing_addressline1_global = "";

        customer_billing_addressline2_global = "";

        customer_billing_country_global = "";

        customer_billing_state_global = "";

        customer_billing_city_global = "";

        customer_billing_zip_global = "";


        customer_id_global = "";


        customer_address_global_id = "";


        discount_global= 0;
        





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

    MockPay.prototype.open = async function () {
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
            loadingGif.src = "https://anonpe.com/circle-preloader.svg";
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
            header_area_img.src = this.business_icon;
            header_area_img.className = 'payment-card-header-logo-img';
            header_area_border.appendChild(header_area_img);

            
            const header_area_title = document.createElement('div');

            header_area_title.className = 'payment-card-header-title';
            
            const header_area_companyname = document.createElement('div');
            header_area_companyname.className = 'payment-card-header-companyname';
            header_area_companyname.innerHTML = this.business_title;
            header_area_title.appendChild(header_area_companyname);
            const header_area_extrainfo = document.createElement('div');
            header_area_extrainfo.className = 'payment-card-header-extrainfo';
            header_area_extrainfo.innerHTML = 'ORDS134442';


            header_area_title.appendChild(header_area_extrainfo);
            
            const header_area_amount = document.createElement('div');
            header_area_amount.className = 'payment-card-header-amount';
            header_area_amount.innerHTML = this.currency_user_defined +' ' + this.amount;
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
            const txn = await request('https://sykmj6ydmf.execute-api.us-east-1.amazonaws.com/dev/countries', "GET", {});
            countriesdata_global = txn; 
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
               
                if(emailinput.value == ''){
                    alert('Please enter email');
                    return;
                }
                if(customernameinput.value == ''){
                    alert('Please enter name');
                    return;
                }
                if(phone.value == ''){
                    alert('Please enter mobile number');
                    return;
                }
                if(countrycode.value == ''){
                    alert('Please select country code');
                    return;
                }

                var emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(!emailregex.test(emailinput.value)){
                    alert('Please enter valid email');
                    return;
                }
                if(customernameinput.value.length < 3){
                    alert('Please enter valid name');
                    return;
                }
                if(phone.value.length < 10){
                    alert('Please enter valid mobile number');
                    return;
                }
               


                customer_name_global = customernameinput.value;
                customer_email_global = emailinput.value;
                customer_phone_global = phone.value;
                customer_country_code_global = countrycode.value;

                // edit_add_address(emailinput.value,customernameinput.value,countrycode.value,phone.value, this.amount, addresses);
                afterfirstframe(this.amount);
                // coupons_frame(this.amount);
                // overview(emailinput.value, phone.value, countrycode.value, customernameinput.value, this.amount);
                // secondframe(this.amount);
            }


            async function afterfirstframe(amount) {

              
                var customer_id ="";
                const mycountrycodearr = customer_country_code_global.split(" ");
                console.log(mycountrycodearr);
                const check_if_customer_is_present = await request('https://rapidapiv2.herokuapp.com/check/customer', "POST", {
                    country_code: mycountrycodearr[2],
                    number: customer_phone_global
                    });
                if(check_if_customer_is_present.status == "true"){
                    console.log("customer is present");
                    customer_id = check_if_customer_is_present.customer_id;
                    customer_id_global = customer_id;
                }
                else{

                    const create_customer = await request('https://sykmj6ydmf.execute-api.us-east-1.amazonaws.com/dev/create/customer', "POST", {
                        
    
                            "email": customer_email_global,
                            "metadata": {
                                "merchant_defined": true
                            },
                            "name": customer_name_global,
                            "phone_number": "+"+mycountrycodearr[2]+customer_phone_global
                
                     });

                     if(create_customer.body.status.status=="SUCCESS"){
                            console.log("customer created");
                            customer_id = create_customer.body.data.id;
                            customer_id_global = customer_id;
                            const savetodatabase = await request('save/customer', "POST", {
                                
                                    "name" : create_customer.body.data.name,
                                    "email" : create_customer.body.data.email,
                                    "number" : create_customer.body.data.phone_number,
                                    "customer_id" : create_customer.body.data.id

                                
                            


                             });
                    
                    console.log(savetodatabase);
                    

                }
                else{
                    console.log("Customer not created");
                }
            }
                console.log(check_if_customer_is_present);
                
                const thisform = document.getElementById('frame1');
                thisform.style.display = 'none';
                const thisform2 = document.getElementById('frame2');
                thisform2.style.display = 'block';
                
                console.log(customer_email_global+" "+customer_name_global+" "+customer_phone_global+" "+customer_country_code_global);
                var payment_methods_arr=[];
                console.log("Proceeding");
                while(thisform2.firstChild){
                    thisform2.removeChild(thisform2.firstChild);
                }
                loadingOverlay.classList.remove('hide');
                const sendOtp = await request('https://sykmj6ydmf.execute-api.us-east-1.amazonaws.com/dev/sendotp/'+ mycountrycodearr[2] +'/number/'+ customer_phone_global + '/customerid/' + customer_id_global, "GET", {});
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
                profileName.innerText = customer_email_global;
                const profileEmail = document.createElement("div");
                profileEmail.className = 'payment-profile-email';
    
                profileEmail.innerText = customer_phone_global;
                profile.appendChild(profileName);
                profile.appendChild(profileEmail);
                thisform2.appendChild(profile);
                
                
                let check_if_address_exist = await fetch(`https://sykmj6ydmf.execute-api.us-east-1.amazonaws.com/dev/checkifexist/${customer_id_global}`);

                check_if_address_exist = await check_if_address_exist.json();
                console.log(check_if_address_exist.status);
                if(check_if_address_exist.status === 200) {
                    const messagebox = document.createElement("div");
                    messagebox.className = 'otp-container';
                    const verifymobilenumber = document.createElement("div");
                    verifymobilenumber.className = 'verifymobilenumber';
                    const verifymobilenumbertext = document.createElement("div");
                    const imptext = document.createElement("div");
                    imptext.innerText = "To use your saved addresses, enter the OTP sent to +" + mycountrycodearr[2] + customer_phone_global;
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

                let resp = await fetch("https://sykmj6ydmf.execute-api.us-east-1.amazonaws.com/dev/verifyotp", requestOptions)
                resp = await resp.json();
                console.log(resp.status);
                if(resp.status==="true"){
                    const address = resp.address;
                    
                    alert(resp.message);
                    addresses_global = address;
                    addressframe(amount);
                }
                else{
                    alert(resp.message);
                }

                
                                        

                    }
                    const getskipbtn = document.createElement("button");
                    getskipbtn.className = 'button-8';
                    getskipbtn.innerText = "Skip";
                    getskipbtn.onclick = async () => {
                        
                        edit_add_address(undefined, amount);
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

                    edit_add_address(undefined, amount);

                }
               


            }

            async function addressframe(amount) {

            
                const mycountrycodearr = customer_country_code_global.split(" ");
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
                profileName.innerText = customer_email_global;
                const profileEmail = document.createElement("div");
                profileEmail.className = 'payment-profile-email';
    
                profileEmail.innerText = customer_phone_global;
                profile.appendChild(profileName);
                profile.appendChild(profileEmail);
                thisform2.appendChild(profile);
                const addresscontainer = document.createElement("div");
                
                for(let i=0;i<addresses_global.length;i++){
                    const addressbox = document.createElement("div");
                    addressbox.className = 'address-box';
                    
                    const addressboxtext = document.createElement("div");
                    addressboxtext.className = 'address-box-text';
                    let fetchaddress = await fetch(`https://sykmj6ydmf.execute-api.us-east-1.amazonaws.com/dev/addresses/`+addresses_global[i].id, {});
                    fetchaddress = (await fetchaddress.json());
                    console.log(fetchaddress);
                    addressboxtext.innerText = fetchaddress.line_1 + ", " + fetchaddress.line_2 + ", " + fetchaddress.city + ", " + fetchaddress.state + ", " + fetchaddress.country + ", " + fetchaddress.zip;

                    addressbox.setAttribute('id', addresses_global[i]._id);

                    const addressboxbtn = document.createElement("button");
                    
                    addressboxbtn.className = 'button-8';
                    addressboxbtn.innerText = "Select";
                    addressboxbtn.onclick = (() => {
                        console.log(addresses_global[i]._id);

                        customer_billing_name_global = fetchaddress.name;

                        
                        customer_billing_phone_global = fetchaddress.phone_number;
                        
                        customer_billing_addressline1_global = fetchaddress.line_1;

                        customer_billing_addressline2_global = fetchaddress.line_2;

                        customer_billing_city_global = fetchaddress.city;

                        customer_billing_state_global = fetchaddress.state;

                        customer_billing_country_global = fetchaddress.country;

                        customer_billing_zip_global = fetchaddress.zip;



                        
                        // overview(email, phone, countrycode, customername, amount, fetchaddress.id, fetchaddress.line_1, fetchaddress.line_2, fetchaddress.city, fetchaddress.state, fetchaddress.country, fetchaddress.zip, address);
                        // secondframe(email, phone, countrycode, customername, amount, address[i]._id, address[i].Address1, address[i].Address2, address[i].City, address[i].State, address[i].Country, address[i].PinCode, address);
                        customer_address_global_id = fetchaddress.id;
                        overview(amount);
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
                        
                            addressbox.classList.add('address-box-delete');
                           
                           fetch(`https://rapidapiv2.herokuapp.com/customerid/${customer_id_global}/deleteaddr/${addresses_global[i]._id}`, {}).then(function(response) {
                            
                             const deletedarea = document.getElementById(addresses_global[i]._id);
                             deletedarea.remove();
                             addressbox.classList.remove('address-box-delete');
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

            async function overview(amount) {

                // 
                var discount = discount_global;
                var total = amount-discount_global;
                console.log(customer_address_global_id);
                const thisform = document.getElementById('frame1');
                thisform.style.display = 'none';
                const thisform2 = document.getElementById('frame2');
                thisform2.style.display = 'block';
                while(thisform2.firstChild){
                    thisform2.removeChild(thisform2.firstChild);
                }

                let fetchcoupons = await fetch(`https://sykmj6ydmf.execute-api.us-east-1.amazonaws.com/dev/list/coupons`, {});
                fetchcoupons = (await fetchcoupons.json());

                const overviewwrapper = document.createElement("div");
                overviewwrapper.className = 'overview-wrapper';
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
                email_providedname.innerText = customer_email_global;
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
                phone_providedname.innerText = customer_phone_global;
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
                    
                    edit_add_address(total);
                });

                address_header_edit.appendChild(address_header_edit_button);

                address_header.appendChild(address_header_container);
                address_header.appendChild(address_header_edit);
              

                const address_complete = document.createElement("div");
                address_complete.className = 'address-complete';
              
                const address_line_1 = document.createElement("div");
                address_line_1.className = 'address-line-1';
                address_line_1.innerHTML = customer_billing_name_global + ", " +customer_billing_addressline1_global + ", " + customer_billing_addressline2_global;

                

                const address_line_3_container = document.createElement("div");
                address_line_3_container.style = 'display:flex;justify-content:space-between;';
                const address_line_3 = document.createElement("div");
                address_line_3.className = 'address-line-3';
                address_line_3.innerHTML = "City: " + customer_billing_city_global;

                const address_line_4 = document.createElement("div");
                address_line_4.className = 'address-line-4';
                address_line_4.innerHTML = "State: " + customer_billing_state_global;

                const address_line_5_wrapper = document.createElement("div");
                address_line_5_wrapper.style = 'display:flex;justify-content:space-between;';

                const address_line_5 = document.createElement("div");
                address_line_5.className = 'address-line-5';
                address_line_5.innerHTML = "Country: " + customer_billing_country_global;

                const address_line_6 = document.createElement("div");
                address_line_6.className = 'address-line-6';
                address_line_6.innerHTML = "Pin: " + customer_billing_zip_global;

                address_line_5_wrapper.appendChild(address_line_5);
                address_line_5_wrapper.appendChild(address_line_6);


                address_line_3_container.appendChild(address_line_3);
                address_line_3_container.appendChild(address_line_4);

                const address_line_7 = document.createElement("div");
                address_line_7.className = 'address-line-7';
                address_line_7.innerHTML = "Billing Number: " + customer_billing_phone_global;



                address_complete.appendChild(address_line_1);
               
                address_complete.appendChild(address_line_3_container);
                address_complete.appendChild(address_line_5_wrapper);
                address_complete.appendChild(address_line_7);


                



                
                address_provided_wrapper.appendChild(address_header);
                address_provided_wrapper.appendChild(address_complete);

                const coupons_wrapper = document.createElement("div");
                coupons_wrapper.className = 'coupons-wrapper';

                const coupons_inner_wrapper = document.createElement("div");
                coupons_inner_wrapper.className = 'coupons-inner-wrapper';
                const coupons_discount = document.createElement("div");
                coupons_discount.className = 'coupons-discount';
                coupons_discount.innerHTML = '<i class="fa-solid fa-tag"></i>';
                const coupons_discount_text = document.createElement("div");
                coupons_discount_text.className = 'coupons-discount-text';
                coupons_discount_text.innerHTML = "Have a coupon? <span class='gray-coupons'> ( "+fetchcoupons.coupons.length+" Available )</span>";
                const rightarrow = document.createElement("div");
                rightarrow.className = 'rightarrow';
                rightarrow.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
                coupons_inner_wrapper.appendChild(coupons_discount);
                coupons_inner_wrapper.appendChild(coupons_discount_text);
                
                coupons_wrapper.appendChild(coupons_inner_wrapper);
                coupons_wrapper.appendChild(rightarrow);




                const order_wrapper = document.createElement("div");
                order_wrapper.className = 'order-wrapper';

                const order_header = document.createElement("div");
                order_header.className = 'order-header';
                order_header.innerText = "Order Summary";

                order_wrapper.appendChild(order_header);

               
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
                  secondframe(total);
                  
                  
                
                }
                );


                
                order_details.appendChild(originalprice_container);
                order_details.appendChild(discount_container);
                order_details.appendChild(final_container);
                order_wrapper.appendChild(order_details);

                

                coupons_wrapper.onclick = (() => {
                    coupons_frame(amount, fetchcoupons);
                });





               



                overviewwrapper.appendChild(contactdetails);
                overviewwrapper.appendChild(address_provided_wrapper);
                overviewwrapper.appendChild(coupons_wrapper);
                overviewwrapper.appendChild(order_wrapper);
                thisform2.appendChild(overviewwrapper);
                thisform2.appendChild(paybutton);
              
            }

            async function coupons_frame(amount, coupons_json){

                console.log(coupons_json.coupons);
                const thisform = document.getElementById('frame1');
                thisform.style.display = 'none';
                const thisform2 = document.getElementById('frame2');
                thisform2.style.display = 'block';
                while(thisform2.firstChild){
                    thisform2.removeChild(thisform2.firstChild);
                }
                
                const coupons_wrapper_parent = document.createElement("div");
                coupons_wrapper_parent.className = 'coupons_wrapper_parent';

                const coupons_header_wrapper = document.createElement("div");
                coupons_header_wrapper.className = 'coupons_header_wrapper';
                const coupons_header = document.createElement("div");
                coupons_header.className = 'coupons-header';
                coupons_header_icon = document.createElement("div");
                coupons_header_icon.className = 'coupons-header-icon';
                coupons_header_icon.innerHTML = '<i class="fa-solid fa-tag"></i>';
                coupons_header_text = document.createElement("div");
                coupons_header_text.className = 'coupons-header-text';
                coupons_header_text.innerText = "Available Coupons";
                coupons_header.appendChild(coupons_header_icon);
                coupons_header.appendChild(coupons_header_text);

                
                const back_to_overview_btn = document.createElement("button");
                back_to_overview_btn.className = 'button-8';
                back_to_overview_btn.innerText = "Back";
                back_to_overview_btn.onclick = (() => {
                    
                    overview(amount);
                });
                coupons_header_wrapper.appendChild(coupons_header);
                coupons_header_wrapper.appendChild(back_to_overview_btn);
                coupons_wrapper_parent.appendChild(coupons_header_wrapper);
                for(let i=0; i<coupons_json.coupons.length; i++){
                const coupons_lists = document.createElement("div");
                coupons_lists.className = 'coupons-lists';
                

                const coupons_list_child = document.createElement("div");
                coupons_list_child.className = 'coupons-list-child';
                
                const coupons_header = document.createElement("div");
                coupons_header.className = 'coupons-header';

                const coupons_list_child_text = document.createElement("div");
                coupons_list_child_text.className = 'coupons-list-child-text';
                coupons_list_child_text.innerText = coupons_json.coupons[i].metadata.code;

                const applybtn = document.createElement("button");
                applybtn.className = 'button-58 small';
                applybtn.innerText = "Apply";
                applybtn.onclick = (() => {
                    let discounted_amount = (coupons_json.coupons[i].amount_off!=0? (amount - coupons_json.coupons[i].amount_off) : (amount- (coupons_json.coupons[i].percent_off/100 * amount)));

                    discount_global = (coupons_json.coupons[i].amount_off!=0? coupons_json.coupons[i].amount_off : (coupons_json.coupons[i].percent_off/100 * amount));
                    this.amount = discounted_amount;
                    document.getElementsByClassName('payment-card-header-amount')[0].innerText = currency_user_definedx + " "+ discounted_amount;
                     overview(amount);
                });

                const coupons_list_child_value = document.createElement("div");
                coupons_list_child_value.className = 'coupons-list-child-value';
                coupons_list_child_value.innerText = "Use code " + coupons_json.coupons[i].metadata.code + " to get " + (coupons_json.coupons[i].amount_off!=0 ? "FLAT" +coupons_json.coupons[i].amount_off : coupons_json.coupons[i].percent_off + "%" ) + " off";
                const coupons_list_child_date = document.createElement("div");
                coupons_list_child_date.className = 'coupons-list-child-date';
                coupons_list_child_date.innerText = "";

                coupons_header.appendChild(coupons_list_child_text);
                coupons_header.appendChild(applybtn);


                coupons_list_child.appendChild(coupons_header);
                coupons_list_child.appendChild(coupons_list_child_value);
                coupons_list_child.appendChild(coupons_list_child_date);
                coupons_lists.appendChild(coupons_list_child);
                coupons_wrapper_parent.appendChild(coupons_lists);
               
                }
               
               
                thisform2.appendChild(coupons_wrapper_parent);
                
               


            }


            async function edit_add_address(amount) {
          
                const thisform = document.getElementById('frame1');
                thisform.style.display = 'none';
                const thisform2 = document.getElementById('frame2');
                thisform2.style.display = 'block';

                
                while(thisform2.firstChild) {
                    thisform2.removeChild(thisform2.firstChild);
                }
                var countriesdata = countriesdata_global;
               
                

                
                const address_wrapper = document.createElement("div");
                address_wrapper.className = 'address-wrapper';
                const address_header = document.createElement("div");
                address_header.className = 'address-header';
                
                const address_title_icon = document.createElement("div");
                address_title_icon.className = 'address-title-icon';
                const address_icon = document.createElement("div");
                address_icon.className = 'address-icon';
                address_icon.innerHTML = '<i class="fas fa-map-marker-alt"></i> ';

                const address_title = document.createElement("div");
                address_title.className = 'address-title';
                address_title.innerText = "Delivery Address";

                address_title_icon.appendChild(address_icon);
                address_title_icon.appendChild(address_title);
                
                const address_change_btn = document.createElement("div");
                address_change_btn.className = 'address-change-btn';
                
                const back_btn = document.createElement("button");
                back_btn.className = 'button-8';
                back_btn.innerText = "Back";
                

                address_change_btn.appendChild(back_btn);

                address_header.appendChild(address_title_icon);
                address_header.appendChild(address_change_btn);


                const address_form = document.createElement("form");

                const billing_name_wrapper = document.createElement("div");
                billing_name_wrapper.className = 'billing-name-wrapper';

                const billing_name = document.createElement("input");
                billing_name.className = 'Billing-Name';
                billing_name.placeholder="Billing Name";
                billing_name.type = "text";
                billing_name.value = customer_name_global;

                billing_name_wrapper.appendChild(billing_name);

                const billing_phone_wrapper = document.createElement("div");
                billing_phone_wrapper.className = 'billing-phone-wrapper';
                

                const billing_phone_country_code = document.createElement("select");
                billing_phone_country_code.className = 'billing-phone-country-code';
                

                 for(var i=0;i<countrycodeslist.length;i++) {
                    var iterator = document.createElement("option");
                    if(countrycodeslist[i].phone_code == 91){
    
                        iterator.setAttribute("selected", "selected");
                    }
                    iterator.value = countrycodeslist[i].phone_code;
                    iterator.text = countrycodeslist[i].phone_code;
                    billing_phone_country_code.appendChild(iterator);
                }
                // billing_phone_country_code.value = customer_country_code_global
                
                const billing_phone = document.createElement("input");
                billing_phone.className = 'billing-phone';
                billing_phone.placeholder="Billing Phone Number";
                billing_phone.type = "text";
                billing_phone.value = customer_phone_global;

                billing_phone_wrapper.appendChild(billing_phone_country_code);
                billing_phone_wrapper.appendChild(billing_phone);



                

                const country_pin_wrapper = document.createElement("div");
                country_pin_wrapper.className = 'country_pin_wrapper';
                
                const countryinput = document.createElement("select");
                countryinput.className = 'countryinput';
                loadingOverlay.classList.remove('hide');
               
                console.log(countriesdata.body.data);
                countrycodeslist = countriesdata.body.data;

                for(var i=0;i<countrycodeslist.length;i++) {
                    var iterator = document.createElement("option");
                    if(countrycodeslist[i].phone_code == 91){
    
                        iterator.setAttribute("selected", "selected");
                    }
                    iterator.value = countrycodeslist[i].iso_alpha2;
                    iterator.text = countrycodeslist[i].iso_alpha2;
                    countryinput.appendChild(iterator);
                }
                
               
                loadingOverlay.classList.add('hide');

                const pininput = document.createElement("input");
                pininput.className = 'pininput';
                pininput.placeholder="Pin Code";

                country_pin_wrapper.appendChild(countryinput);
                country_pin_wrapper.appendChild(pininput);

                const city_state_wrapper = document.createElement("div");
                city_state_wrapper.className = 'city_state_wrapper';
                const cityinput = document.createElement("input");
                cityinput.className = 'cityinput';
                cityinput.placeholder="City";
                const stateinput = document.createElement("input");
                stateinput.className = 'stateinput';
                stateinput.placeholder="State";
                city_state_wrapper.appendChild(cityinput);
                city_state_wrapper.appendChild(stateinput);


                const full_address_wrapper = document.createElement("div");
                full_address_wrapper.className = 'full_address_wrapper';
                const address1input = document.createElement("textarea");
                address1input.className = 'address1input';
                address1input.placeholder="House Number, Apartment*";
                const address2input = document.createElement("textarea");
                address2input.className = 'address2input';
                address2input.placeholder="Area, Colony, Street, Sector*";
                full_address_wrapper.appendChild(address1input);
                full_address_wrapper.appendChild(address2input);


             
                const save_address_permission = document.createElement("div");
                save_address_permission.className = 'save_address_permission';
                const save_address_permission_checkbox = document.createElement("input");
                save_address_permission_checkbox.className = 'save_address_permission_checkbox';
                save_address_permission_checkbox.type = "checkbox";
                save_address_permission_checkbox.id = "save_address_permission_checkbox";
                const save_address_permission_label = document.createElement("label");
                save_address_permission_label.className = 'save_address_permission_label';
                save_address_permission_label.htmlFor = "save_address_permission_checkbox";
                save_address_permission_label.innerText = "Save this address for future use";
                save_address_permission.appendChild(save_address_permission_checkbox);
                save_address_permission.appendChild(save_address_permission_label);
                const address_submit_btn = document.createElement("button");
                if(customer_address_global_id==null || customer_address_global_id=="" || customer_address_global_id==undefined){

                    back_btn.onclick = (() => {
                        console.log("back button clicked");
                        const thisform = document.getElementById('frame1');
                          thisform.style.display = 'block';
                         const thisform2 = document.getElementById('frame2');
                         thisform2.style.display = 'none';

                    
                    });
                    address_submit_btn.className = 'pay-button';
                    address_submit_btn.id = 'absbtn';
                    address_submit_btn.innerText = "Add Address and Continue";
                    address_submit_btn.onclick = (async () => {
                       
                        customer_billing_name_global = billing_name.value;
                        
                        customer_billing_countrycode_global = billing_phone_country_code.value;
                        customer_billing_phone_global = customer_billing_countrycode_global+ billing_phone.value;
                        customer_billing_addressline1_global = address1input.value;
                        customer_billing_addressline2_global = address2input.value;
                        customer_billing_country_global = countryinput.value;
                        customer_billing_state_global = stateinput.value;
                        customer_billing_city_global = cityinput.value;
                        customer_billing_zip_global = pininput.value;
    
                        if(save_address_permission_checkbox.checked){
                            
                                      
                        const savethisaddress = await fetch(`https://sykmj6ydmf.execute-api.us-east-1.amazonaws.com/dev/save/address/${customer_id_global}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                            
                                "name": customer_billing_name_global,
                                "line_1": customer_billing_addressline1_global,
                                "line_2": customer_billing_addressline2_global,
                                "country": customer_billing_country_global,
                                "state": customer_billing_state_global,
                                "city": customer_billing_city_global,
                                "zip": customer_billing_zip_global,
                                "phone_number": customer_billing_phone_global,
                                "metadata": {
                                    "merchant_defined": true
                                }
                            })
                        });
                        const savethisaddress_json = await savethisaddress.json();

                        console.log(savethisaddress_json);

                        alert("Address Saved");

                        customer_address_global_id = savethisaddress_json.body.id;

                        }
                    
                       
    
    
                        overview(amount);
                        
                     
    
    
                    });


                }else{
                    back_btn.onclick = (() => {
                        overview(amount);
                        
                    });
                address_submit_btn.className = 'pay-button';
                address_submit_btn.id = 'absbtn';
                address_submit_btn.innerText = "Update Address and Continue";
                address_submit_btn.onclick = (async () => {
                   
                    customer_billing_name_global = billing_name.value;
                        
                    customer_billing_countrycode_global = billing_phone_country_code.value;
                    customer_billing_phone_global = customer_billing_countrycode_global+ billing_phone.value;
                    customer_billing_addressline1_global = address1input.value;
                    customer_billing_addressline2_global = address2input.value;
                    customer_billing_country_global = countryinput.value;
                    customer_billing_state_global = stateinput.value;
                    customer_billing_city_global = cityinput.value;
                    customer_billing_zip_global = pininput.value;

                    if(save_address_permission_checkbox.checked){
              
                        const savethisaddress = await fetch(`https://sykmj6ydmf.execute-api.us-east-1.amazonaws.com/dev/save/address/${customer_id_global}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                            
                                "name": customer_billing_name_global,
                                "line_1": customer_billing_addressline1_global,
                                "line_2": customer_billing_addressline2_global,
                                "country": customer_billing_country_global,
                                "state": customer_billing_state_global,
                                "city": customer_billing_city_global,
                                "zip": customer_billing_zip_global,
                                "phone_number": customer_billing_phone_global,
                                "metadata": {
                                    "merchant_defined": true
                                }
                            })
                        });
                        const savethisaddress_json = await savethisaddress.json();
                        customer_address_global_id = savethisaddress_json.body.id;
                        console.log(savethisaddress_json);

                        alert("Address Saved");


                    }
                



                    overview(amount);


                });

            }

                address_form.appendChild(billing_name_wrapper);
                address_form.appendChild(billing_phone_wrapper);
                address_form.appendChild(country_pin_wrapper);
                address_form.appendChild(city_state_wrapper);   
               
                address_form.appendChild(full_address_wrapper);
                address_form.appendChild(save_address_permission);
                



                address_wrapper.appendChild(address_header);

                address_wrapper.appendChild(address_form);
                
                thisform2.appendChild(address_wrapper);
                thisform2.appendChild(address_submit_btn);
                







            }


            async function secondframe(amount) {
                create_and_store_token();
                console.log(amount);
                const mycountrycodearr = customer_country_code_global.split(" ");
              
                var payment_methods_arr=[];
                console.log("Proceeding");
                const thisform = document.getElementById('frame1');
                thisform.style.display = 'none';
                const thisform2 = document.getElementById('frame2');
                thisform2.style.display = 'block';
                const thisform3 = document.getElementById('frame3');
                thisform3.style.display = 'none';
                const thisform4 = document.getElementById('frame4');
                thisform4.style.display = 'none';

                while(secondcontainer.firstChild){
                    secondcontainer.removeChild(secondcontainer.firstChild);
                }
                if (!secondcontainer.hasChildNodes()) {
                console.log("I am here");
                const profile = document.createElement("div");
                profile.className = 'payment-profile';
                profile.onclick = (() => {
                    overview(amount);
                    });
                const profileimg = document.createElement("div");
                profileimg.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
                profileimg.className = 'payment-profile-img';
                profile.appendChild(profileimg);
                const profileName = document.createElement("div");
                profileName.className = 'payment-profile-name';
                profileName.innerText = customer_email_global;
                const profileEmail = document.createElement("div");
                profileEmail.className = 'payment-profile-email';
    
                profileEmail.innerText = mycountrycodearr[2] +customer_phone_global;
                profile.appendChild(profileName);
                profile.appendChild(profileEmail);
                secondcontainer.appendChild(profile);


               
                const choosemethods = document.createElement("div");
                          

                
                choosemethods.className = 'payment-card-companyname';
                secondcontainer.appendChild(choosemethods);
                const paymentmethodsContainer = document.createElement("div");
                paymentmethodsContainer.className = 'payment-methods-container';
               


                payment_methods_names_X =["Card", "eWallet", "Cash", "Bank Transfer", "Bank Redirect"];

                console.log(customer_id_global);
                    var url_store = `https://sykmj6ydmf.execute-api.us-east-1.amazonaws.com/dev/customer/${customer_id_global}/paymentmethods`;
                    let stored_paymet_methods = await fetch(url_store);
                    const stored_paymet_methods_json = await stored_paymet_methods.json();



                    console.log(stored_paymet_methods_json.payment_methods);
                    

                    for(let i=0;i<stored_paymet_methods_json.payment_methods.length; i++){
                        console.log("ia madasidiasdjias");

                        if(stored_paymet_methods_json.payment_methods[i].category=="card"){
                        const prefferedpayments = document.createElement("div");
                        prefferedpayments.className = 'payment-methods-preffered';
                        
                        const prefferedpayments_left_wrapper = document.createElement("div");
                        prefferedpayments_left_wrapper.className = 'payment-methods-preffered-left-wrapper';
    
    
    
                        const prefferedpayments_icon = document.createElement("div");
                        prefferedpayments_icon.innerHTML = '<img src="'+stored_paymet_methods_json.payment_methods[i].image+'" alt="">';
                        prefferedpayments_icon.className = 'payment-methods-preffered-icon';
                        prefferedpayments.appendChild(prefferedpayments_icon);
                        const prefferedpayments_text = document.createElement("div");
                        prefferedpayments_text.className = 'payment-methods-preffered-text';
                        
                        
    
                        const optiontitle = document.createElement("div");
                        optiontitle.className = 'payment-methods-preffered-text';
    
                        const optiontitle_card_name = document.createElement("div");
                        optiontitle_card_name.className = 'payment-methods-preffered-text-card-name';
                        optiontitle_card_name.innerText = stored_paymet_methods_json.payment_methods[i].name;
                        optiontitle.appendChild(optiontitle_card_name);
                        const optiontitle_card_number = document.createElement("div");
    
                        optiontitle_card_number.className = 'payment-methods-preffered-text-card-number';
                        optiontitle_card_number.innerText = "**** **** **** "+ stored_paymet_methods_json.payment_methods[i].last4;
                        optiontitle.appendChild(optiontitle_card_number);
    
                        const optiontitle_card_expiry = document.createElement("div");
                        optiontitle_card_expiry.className = 'payment-methods-preffered-text-card-expiry';
                        optiontitle_card_expiry.innerText = stored_paymet_methods_json.payment_methods[i].expiration_month+"/"+stored_paymet_methods_json.payment_methods[i].expiration_year; 
                        optiontitle.appendChild(optiontitle_card_expiry);
    
                        prefferedpayments_left_wrapper.appendChild(prefferedpayments_icon);
                        prefferedpayments_left_wrapper.appendChild(optiontitle);
    
    
    
    
                        const prefferedpayments_right_wrapper = document.createElement("button");
                        prefferedpayments_right_wrapper.className = 'button-8';
                        prefferedpayments_right_wrapper.innerText = "Pay Now";
                        prefferedpayments_right_wrapper.onclick = (() => {
                            let thisframe = function (){

                                secondframe(amount);
                            }
                            forthframe( stored_paymet_methods_json.payment_methods[i].type, mycountrycodearr[0], mycountrycodearr[1], amount, thisframe);
                        });

    
                        prefferedpayments.appendChild(prefferedpayments_left_wrapper);
                        prefferedpayments.appendChild(prefferedpayments_right_wrapper);
                        
                        
    
    
    
    
                        prefferedpayments.appendChild(prefferedpayments_text);
                        paymentmethodsContainer.appendChild(prefferedpayments);
                    }
                    }
              

                    const all_active_payment_methods = document.createElement("div");
                    all_active_payment_methods.className = 'payment-methods-all-active';

                for (var i = 0; i < payment_methods_names_X.length; i++) {
                   let name = payment_methods_names_X[i];
                   console.log(name);
                     window['p'+i]= document.createElement("div");
                     window['p'+i].className = 'payment-methods-cards button-58';
                     window['p'+i].id= name;
                     window['p'+i].innerHTML = payment_methods_names_X[i];
                     all_active_payment_methods.appendChild( window['p'+i]);
                    window['p'+i].onclick = (() => {
                     

                        thirdframe(name,mycountrycodearr[0], card_store, eWallet_store, Cash_store, Bank_Transfer_store, Bank_Redirect_store, mycountrycodearr[1], amount);
                        }
                    );

                }
                paymentmethodsContainer.appendChild(all_active_payment_methods);
                secondcontainer.appendChild(paymentmethodsContainer);
              
                
            }
            loadingOverlay.classList.remove('hide');
            const paymentmethods = await request('https://sykmj6ydmf.execute-api.us-east-1.amazonaws.com/dev/FetchPaymentMethods/'+ mycountrycodearr[0], "GET", {});
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
            
           
           

            }


            async function thirdframe(payment_methods_name, countrycode, card_store, eWallet_store, Cash_store, Bank_Transfer_store, Bank_Redirect_store, currency, amount) {
                    
                const thisform = document.getElementById('frame1');
                thisform.style.display = 'none';
                const thisform2 = document.getElementById('frame2');
                thisform2.style.display = 'none';
                const thisform3 = document.getElementById('frame3');
                thisform3.style.display = 'block';
                const thisform4 = document.getElementById('frame4');
                thisform4.style.display = 'none';

                while(thisform3.firstChild){
                    thisform3.removeChild(thisform3.firstChild);
                }
            
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
                
                
                if(payment_methods_arr_load.length!=0){
                payment_methods_arr_load.forEach(element => {
                    
                    let name = element.type;

                    const loaderspecific_methods = document.createElement("div");
                    loaderspecific_methods.className = 'payment-icon';
                 
                    loaderspecific_methods.id = name;
                    loaderspecific_methods.innerHTML = '<img src="'+element.image+'" alt="" class="payment-card-image-load">';
                    loaderspecific_methods.onclick = (() => {
                        
                        let thisframe = function (){

                            thirdframe(payment_methods_name, countrycode, card_store, eWallet_store, Cash_store, Bank_Transfer_store, Bank_Redirect_store, currency, amount);
                        }
                        forthframe(name, countrycode, currency, amount, thisframe);
                    });
                    paymentmethods_cards_load.appendChild(loaderspecific_methods);
                               

                    console.log(element);
                });
            }
            else{

                paymentmethods_cards_load.innerHTML = '<div class="payment-methods-cards-load-text">No payment methods available</div>';
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

            async function forthframe(paymentid, countrycode, currency, amount, backframe) {

                const thisform = document.getElementById('frame1');
                thisform.style.display = 'none';
                const thisform2 = document.getElementById('frame2');
                thisform2.style.display = 'none';
                const thisform3 = document.getElementById('frame3');
                thisform3.style.display = 'none';
                const thisform4 = document.getElementById('frame4');
                thisform4.style.display = 'block';
                while(thisform4.firstChild){
                    thisform4.removeChild(thisform4.firstChild);
                }
                    const backbtn = document.createElement("div");
                    backbtn.className = 'back-button';
                    
                    backbtn.innerHTML = '<i class="fa fa-arrow-left" aria-hidden="true"></i>Back';
                    
                    backbtn.style.backgroundColor = this.themeColor;
                    backbtn.onclick = (() => {
                        backframe();
                    });

                    

                    thisform4.appendChild(backbtn);
                   
                   
                   

                   
                    let currentepochtime =  Math.floor( new Date().getTime() / 1000 )+5000;
                    console.log(currentepochtime);
                    let sendpostrequest = await fetch('https://sykmj6ydmf.execute-api.us-east-1.amazonaws.com/dev/checkout', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },

                       
                        body: JSON.stringify({
                            
                                "amount": amount,
                                "complete_payment_url": "http://example.com/complete",
                                "country": countrycode,
                                "currency": currency,
                                "requested_currency": currency_user_definedx,
                                "customer": customer_id_global,
                                "error_payment_url": "http://example.com/error",
                                "merchant_reference_id": "950ae8c6-78",
                                "language": "en",
                                "metadata": {
                                    "merchant_defined": true,
                                    "address": {
                                        "billing_name": customer_billing_name_global,
                                        "billing_address_line_1": customer_billing_addressline1_global,
                                        "billing_address_line_2": customer_billing_addressline2_global,
                                        "billing_city": customer_billing_city_global,
                                        "billing_state": customer_billing_state_global,
                                        "billing_country": customer_billing_country_global,
                                        "billing_postal_code": customer_billing_zip_global,
                                        "billing_phone": customer_billing_phone_global,
                                        


                                    },
                                    "orders": customerx

                                },
                               
                                "payment_method_types_include": [
                                    paymentid
                                ],
                                
                                "payment_method_types_exclude": []
                            
                        })
                    });
                    const json_start_checkout = await sendpostrequest.json();
                    console.log(json_start_checkout.body);
                    let checkout = new RapydCheckoutToolkit({
                        pay_button_text: "Click to pay",
                              // Text that appears on the 'Pay' button. 
                              // String. Maximum length is 16 characters.
                              // Default is "Place Your Order". Optional. 
                        pay_button_color: "blue",
                              // Color of the 'Pay' button. String.
                              // Standard CSS color name or hexadecimal code such as #323fff.
                              // Default is the color that is returned in the 'merchant_color'
                              // field of the response to 'Create Checkout Page'. Optional.
                        id: json_start_checkout.body.data.id,
                              // ID of the 'Create Checkout Page' response. String. Required.
                        close_on_complete: true,
                              // Causes the embedded Rapyd Checkout Toolkit window to close
                              // when the payment is complete. Boolean. Default is 'true'. Optional.           
                        page_type: "collection"
                             // Default is "collection". Optional.
                    });
                    checkout.displayCheckout();
                    

                    document.getElementById('mockpay_root').remove();

                    // window.open(json_start_checkout.body.data.redirect_url, "popup", "width=500,height=500");
                   
                    loadingOverlay.classList.remove('hide');
                    // const checking = await pollTransactionStatus(json_start_checkout.body.data.id);
                    // console.log(checking);
                    // forthcontainer.appendChild(checkout_iframe);
                    loadingOverlay.classList.add('hide');

            };





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
          
            const val = await validatetoken(this.amount);
            if(val===true){
                console.log(val);
                overview(this.amount);
            }
            

        }
    }

    async function create_and_store_token(){

        let fetchtoken = await fetch('https://sykmj6ydmf.execute-api.us-east-1.amazonaws.com/dev/createtoken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
                "customer_name_global": customer_name_global,
                "customer_email_global": customer_email_global,
                "customer_phone_global": customer_phone_global,
                "customer_country_code_global" : customer_country_code_global,
            

                "customer_billing_name_global": customer_billing_name_global,
                "customer_billing_phone_global": customer_billing_phone_global,
                "customer_billing_countrycode_global": customer_billing_countrycode_global,
                "customer_billing_addressline1_global": customer_billing_addressline1_global,
               
                "customer_billing_addressline2_global": customer_billing_addressline2_global,
                
                "customer_country_global": customer_billing_country_global,
                "customer_billing_city_global": customer_billing_city_global,
                "customer_billing_state_global": customer_billing_state_global,


                "customer_billing_zip_global": customer_billing_zip_global,
                "customer_id_global": customer_id_global,
                "customer_address_global_id": customer_address_global_id        

                
            })



        });
        fetchtoken = await fetchtoken.json();
        console.log(fetchtoken);
        let savetoken = await fetch('https://rapydtoken.herokuapp.com/save/session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "token": fetchtoken.token,
            })
        });
        savetoken = await savetoken.json();
        console.log(savetoken);
        if(savetoken.status == 200){
            console.log('token saved');
            setCookie('rapyd-token-loggedin', savetoken.id, 30);
        }
      else{

        console.log('token not saved');
      }



    }

    async function validatetoken(){

        try{
        let mytoken = await fetch('https://rapydtoken.herokuapp.com/checksession/'+getCookie('rapyd-token-loggedin'));
        mytoken = await mytoken.json();

        let validatemytoken = await fetch('https://sykmj6ydmf.execute-api.us-east-1.amazonaws.com/dev/validatetoken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "token": mytoken.token,
                    })
        });
        validatemytoken = await validatemytoken.json();
        console.log(validatemytoken);

        if(validatemytoken.status == true){
            customer_name_global =  validatemytoken.customer_name_global;
            window['customer_email_global'] = validatemytoken.customer_email_global;
            window['customer_phone_global']= validatemytoken.customer_phone_global;
            window['customer_country_code_global']= validatemytoken.customer_country_code_global;
        
    
            window['customer_billing_name_global']= validatemytoken.customer_billing_name_global;
            window['customer_billing_phone_global']= validatemytoken.customer_billing_phone_global;
            window['customer_billing_countrycode_global']= validatemytoken.customer_billing_countrycode_global;
            window['customer_billing_addressline1_global']= validatemytoken.customer_billing_addressline1_global;
           
            window['customer_billing_addressline2_global']=validatemytoken.customer_billing_addressline2_global;
            
            window['customer_country_global']=validatemytoken.customer_billing_country_global;
            window['customer_billing_city_global']= validatemytoken.customer_billing_city_global;
            window['customer_billing_state_global']=validatemytoken.customer_billing_state_global;
    
    
            window['customer_billing_zip_global']=validatemytoken.customer_billing_zip_global;
            window['customer_id_global']=validatemytoken.customer_id_global;
            window['customer_address_global_id']=validatemytoken.customer_address_global_id; 
            return true;
        }
         
        return false;
    }
    catch(e){
        console.log(e);
        return false;
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

    function setCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function eraseCookie(name) {   
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }


    window.MockPay = MockPay;
})()
