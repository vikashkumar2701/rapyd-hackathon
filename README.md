> # **Galaxy's Best Checkout for Rapyd Hackathon May 2022**

##  **1.  Installation**

Add JS Library to the react / HTML Page / Simple Adverstisement.

URL : - [https://vikashkumar2701.github.io/rapyd-hackathon/checkout.js](https://vikashkumar2701.github.io/rapyd-hackathon/checkout.js) 

Stylesheet: - [https://vikashkumar2701.github.io/rapyd-hackathon/checkout.css](https://vikashkumar2701.github.io/rapyd-hackathon/checkout.css)

Or, 

Download the stylesheet and checkout.js library and integrate it.

## 2\. Library Parameters:-

new MockPay({  
     keyId: "mockpay\_o35lKNXgA3s5",  
   complete\_payment\_url: window.location.origin + "/success",  
   business\_icon:  SET BUSINESS ICON  
   business\_title: SET BUSINESS TITLE  
   amount: SET AMOUNT,  
   currency\_user\_defined: "INR",  
   customer: {  
       laura: SET ORDER DETAILS JSON  
   },  
   themeColor: "#EC4899f"  
}).open()  
}
