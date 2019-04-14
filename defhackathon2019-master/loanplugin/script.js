const debug = false;
let myscore = `72`;
let myletter = `S`;

$(document).ready(function(){
  console.log("I'm on a checkout page!");
  var registerModal = `<div id='registerModal' class='customModal'></div><div id='applyModal' class='customModal'></div>`;
  $('body').prepend(registerModal);
  let mylink = `<div id="loanHolder"><span class="myscore">Check Your Score</span><a class="applybutton">Apply For Loan</a></div>`;
  $('.sc-proceed-to-checkout').append(mylink);
    buttonListen();
});

function buttonListen() {
  // open modal to register
  $('#loanHolder .myscore').on('click',function(){
    scoreModal();
  });
  
  $('#loanHolder .applybutton').on('click',function(){
    applyModal();
  });

  // var proceed = $('#sc-buy-box-ptc-button .a-button-input');
  // proceed.detach();
  $('#sc-buy-box-ptc-button .a-button-inner').prepend('<div class="custom-button-text">Proceed to checkout</div>');

  $('#sc-buy-box-ptc-button .custom-button-text').on('click',function(event){
    console.log('proceed to checkout pressed', event);
    event.preventDefault;
    areYouSureModal();
  });
}

function scoreModal() {
  let modalContent = `
  <div class='registerModalInner'>
  <div class='modalHeader'>
  <h2>Your Even's Credit Score</h2>
  <div class="scoreNumber">${myscore} - ${myletter}</div>
  </div>
  <div class="scoreInfo">The most transparent and distributed credit scoring system.</div>
  <div class="actionHolder"><button id="no">Cancel</button><a id="yes" href='http://localhost:8080/dashboard' target='_blank' class='fakeButton'>See how it's calculated</a></div>`
  
  $('#registerModal').html(modalContent).show();
  $('#registerModal #yes').on('click',function(event){
    // window.location.href = 'http://apple.com'
  });
  
  $('#registerModal').on('click',function(event){
    if (event.target.id !== 'authURL') {
      $(this).hide();
    }
  })
}

function areYouSureModal() {
  let modalContent = `
  <div class='registerModalInner'>
  <div class='modalHeader'>
  <h2>Good News!</h2>
  </div>
  <div class="scoreInfo">Based on your Even's Credit Score and the required loan amount, our system predicts that you have a high chance of repaying the loan.</div>
  <div class="actionHolder"><button id="no">Apply for loan</button><a id="yes" href='http://localhost:8080/dashboard' target='_blank' class='fakeButton'>No, I want to checkout</a></div>`
  
  $('#registerModal').html(modalContent).show();
  
  $('#registerModal').on('click',function(event){
    
    if (event.target.id == 'no') {
      $(this).hide();
      applyModal();
    }
    
    if (event.target.id == 'yes') {
      $(this).hide();
      window.location.href = 'https://www.amazon.com/gp/cart/desktop/go-to-checkout.html/ref=ox_sc_proceed?isToBeGiftWrappedBefore=&proceedToCheckout=Proceed+to+checkout&cartInitiateId=1555232034927'
    }
    else {
      $(this).hide();
    }

    if (event.target.id !== 'authURL') {

    }
  })
}

function applyModal() {
  let modalContent = `
  <div class='registerModalInner'>
  <div class='modalHeader'>
  <h2>Apply For Loan</h2>
  </div>
  <div class="scoreInfo">Applying for loan will provide instant results. Loan value will be sent to your account upon acceptance.</div>
  <div id="actions"><button id="no">Cancel</button><button id="yes">Apply</button></div><div id="loanForm"></div>`

  let loanForm = `
  <div id='loanInfoHolder'>
  <form id='loanForm'>
  <label for="firstname">First Name</label>
  <input type="text" id="firstname">
  
  <label for="lastname">Last Name</label>
  <input type="text" id="lastname">
  
  <label for="address">Address</label>
  <input type="text" id="address">
  
  <label for="zipcode">Zipcode</label>
  <input type="text" id="zipcode">
  
  <label for="dateOfBirth">Date of Birth</label>
  <input type="text" id="dateOfBirth">
  <button id='loanSubmit'>Submit</button>
  </form>
  <div id='loanResponses'></div>
  </div>
  `
  
  $('#applyModal').html(modalContent).show();
  $('#applyModal #yes').on('click',function(event){
    // window.localStorage.setItem('enableRewards',true);
    // console.log('enableRewards now saved in local storage')
    // showRewardsTable();
  });

  $('#applyModal').on('click',function(event){
    if (event.target.id == 'yes') {
      $('#loanForm').html(loanForm);
    }
    
    if (event.target.id == 'no') {
      $(this).hide();
    }
    
    if (event.target.id == 'loanSubmit') {
      event.preventDefault();
      let firstname = $('#firstname');
      let lastname = $('#lastname');
      let dateOfBirth = $('#dateOfBirth');
      firstname.val();
      let loanResponses = `<div>Hi ${firstname.val()} here are your offers!</div><ul id='offerList'>Now loading offers...</ul>`
      $('#loanResponses').html(loanResponses);
      let formFields = {
        "firstname": firstname.val(),
        "lastname": lastname.val(),
        "dateOfBirth": dateOfBirth.val()
      }
      clearFields();
      apiRequest(formFields);
    }
  })

  function clearFields() {
    $('#loanForm input').val('');
  }
  
  $('#registerModal').on('click',function(event){
    if (event.target.id == 'no') {
      $(this).hide();
    }
  })

  function apiRequest(formFields) {

    console.log('sending postman')
    var data = JSON.stringify({
      "productTypes": [
        "loan", 
        "savings"
      ],
      "loanInformation": {
        "purpose": "large_purchases", 
        "loanAmount": 10000
        // .sc-price
      },
      "personalInformation": {
        "firstName": formFields.firstname, 
        "lastName": formFields.lastname,
        "dateOfBirth": formFields.dateOfBirth,
      },
      "mortgageInformation": {
        "propertyType": "condo", 
        "propertyStatus": "own_with_mortgage", 
        "propertyValue": 200000, 
        "mortgageBalance": 10000, 
        "lenderName": "Bank OF NY", 
        "hasFHALoan": true, 
        "currentWithLoan": true
      }, 
      "creditCardInformation": {
        "allowAnnualFee": true, 
        "cardBenefits": [
          "travel_incentives"
        ]
      }, 
      "creditInformation": {
        "providedCreditRating": "excellent", 
        "providedNumericCreditScore": 780
      }, 
      "financialInformation": {
        "employmentStatus": "employed", 
        "employmentPayFrequency": "weekly", 
        "annualIncome": 12000, 
        "monthlyNetIncome": 1000, 
        "bankName": "Santander", 
        "bankRoutingNumber": "231372691", 
        "bankAccountType": "savings", 
        "monthsAtBank": 10, 
        "bankAccountNumber": "1234567890"
      }, 
      "employmentInformation": {
        "employerName": "EVEN Financial", 
        "employerAddress": "45 W 21st St", 
        "employerCity": "New York", 
        "employerState": "NY", 
        "employerZip": "10010", 
        "jobTitle": "Software Engineer", 
        "monthsEmployed": 14, 
        "directDeposit": true, 
        "payDate1": "2004-10-06", 
        "payDate2": "2004-11-06"
      }, 
      "legalInformation": {
        "consentsToFcra": true, 
        "consentsToTcpa": true, 
        "tcpaLanguage": "I agree to be contacted by Even Financial and its partners at the telephone number(s) I have provided above to explore personal loan offers, including contact through automatic dialing systems, artificial or pre-recorded voice messaging, or text message. I understand my consent is not required as a condition to purchasing any goods or services from anyone."
      }, 
      "clientTags": {
        "hello": [
          "world", 
          "there"
        ], 
        "something": [
          "else"
        ]
      }
    });
    console.log('this is value of data',data)
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        // console.log(this.responseText);
        var results = JSON.parse(this.responseText);
        console.log(typeof results,results.length);
        console.log(results.loanOffers);

        var offerObject = '';

        for (var i in results.loanOffers) {
          console.log('this is i', i)
          console.log('this is i contents', results.loanOffers[i])
          offerObject += `<li>`;
          offerObject += `<div class='originator'><span class='label'>Provider</span>: ${results.loanOffers[i].originator.name}</div>`;
          offerObject += `<div class='originator'><span class='label'>Duration:</span> ${results.loanOffers[i].termLength} ${results.loanOffers[i].termUnit}s  <span class='label'>APR:</span> ${results.loanOffers[i].maxApr}%</div>`;
          offerObject += `<div class='originator'><a href=${results.loanOffers[i].url} target='_blank' class='acceptLoan'>Accept Loan!</a></div>`;
          offerObject += `</li>`;
        }

        // myarray.forEach(element => {
        //   offerObject += `<li>`;
        //   offerObject += `<span class='originator'>Provider: ${element.originator.name}</span>`;
        //   offerObject += `<span class='originator'>Duration: ${element.termLength} ${element.termUnit}s</span>`;
        //   offerObject += `<span class='originator'>APR: ${element.maxApr}</span>`;
        //   offerObject += `</li>`;
        // });

        $('#offerList').html(offerObject);
      }
    });

    xhr.open("POST", "https://api.evenfinancial.com/leads/rateTables");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer e7675dd3-ff3b-434b-95aa-70251cc3784b_88140dd4-f13e-4ce3-8322-6eaf2ee9a2d2");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "eb20bc1b-fa73-40ec-85c6-4798367398aa");

    xhr.send(data);
  }
}
