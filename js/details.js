



//login/signUp
$(function(){
  $.ajax({
    url: "/",
    type: "post",
    success : function(data){
      if(data.code=200){
        $(".header").html("");
        $(".header").append(
          '<a href="./index.html" class="logo">SCU Airlines</a>'+
          '<a href="javascript:;" onclick="logout() class="button">SignOut</a>'+
          '<a href="./login.html" class="button">'+data.result+'</a>'+
          '<a href="#" class="button">Order</a>'+
          '<a href="#" class="button active">Booking Ticket</a>'+
          '<a href="./index.html" class="button">Home</a>'
        )
      }else{
        window.location.href="./login.html"
      }
    }
  })
})

function logout(){
  $.ajax({
    url: "/login/loginOut",
    type: "post",
    data: {},
    success: function(data) {
      window.location.href = "./index.html";
    }
  });
}


let flightId = 0
// Add Passenger Fields as per the User Input for Number of Passengers
function addElement(adultNum, childNum) {
    var i = 0
    var pName = "<div class='form-group grid-temp'><span class='form-label required'>Name</span><input class='form-control p-name' type='text' pattern='[a-zA-Z ]{5,}' required name='pname"+i+1+"'></div>";
    var aAge = "<div class='form-group grid-temp'><span class='form-label required'> Age </span><input class='form-control adultp-age' min='13' max='120' type='number' required name='aAge"+i+1+"'></div>";
    var cAge = "<div class='form-group grid-temp'><span class='form-labelrequired'> Age </span><input class='form-control childp-age' min='1' max='12' type='number' required name='cAge"+i+1+"'></div>";
    var pGender ="<div class='form-group grid-temp'><span class='form-label required'>Gender</span><div class='form-gender-checkbox'><label for='genderp-male'><input type='radio' class='genderp-male' name='gender' required><span></span> Male</label><label for='genderp-female'><input type='radio' class='genderp-female' name='gender'><span></span>Female</label><label for='genderp-none'><input type='radio' class='genderp-none' name='gender'><span></span>Rather Not Say</label></div></div>";
    for(;i<adultNum;i++){
      document.getElementById('PassengerInfo').innerHTML += `<h4 class='plist'>Adult Passenger ${i+1}:</h4>`;
      document.getElementById('PassengerInfo').innerHTML += pName;
      document.getElementById('PassengerInfo').innerHTML += aAge;
      document.getElementById('PassengerInfo').innerHTML += pGender;
    }
    i = 0
    for(;i<childNum;i++){
      document.getElementById('PassengerInfo').innerHTML += `<h4 class='plist'>Child Passenger ${i+1}:</h4>`;
      document.getElementById('PassengerInfo').innerHTML += pName;
      document.getElementById('PassengerInfo').innerHTML += cAge;
      document.getElementById('PassengerInfo').innerHTML += pGender;
    }
}

// Displays the User Input from Homepage Form
function displayInfo(origin, destination, depart, rdate, adultNum, childNum){
  if(rdate=="" || rdate == null){
    document.getElementById('travel-type').innerHTML = "One-Way";
  }
  else{
    document.getElementById('travel-type').innerHTML = "Return Trip";
    document.getElementById('arrivalp').innerHTML = `<h4>Arrival Date : ${rdate}</h4>`;
  }
  document.getElementById('originp').innerHTML = origin.toUpperCase();
  document.getElementById('destinationp').innerHTML = destination.toUpperCase();
  document.getElementById('departp').innerHTML = depart;
  document.getElementById('adultp').innerHTML = adultNum;
  document.getElementById('childp').innerHTML = childNum;
}


// Calculate and print the cost of the ticket
function ticketCost (adultNum, childNum, traveltype) {

  let costAdult = rNum;
  // let roundtrip = document.getElementById('roundtrip').value;
  // if (roundtrip === true ) {
  //     costAdult = costAdult*2*0.75;
  //     }
  if (traveltype === "Business class") {
      costAdult = 2 * costAdult
  }
  if (traveltype === "First class") {
      costAdult = 1.5 * costAdult
  }
  let costChild = Math.floor(costAdult * 0.8);
  let AdultTot = costAdult * adultNum;
  let childTot = costChild * childNum;
  let total = AdultTot + childTot;
  if(childNum != 0){
    document.getElementById('child-cost').innerHTML = `Child Passengers: ${childNum} X ${costChild} = ${childTot} RMB`;
  }
  document.getElementById('adult-cost').innerHTML = `${adultNum} X ${costAdult} = ${AdultTot} RMB`;
  document.getElementById('ticket-cost').innerHTML = `${total} RMB`;
  document.getElementById('cost-text').innerHTML = `Total Cost: ${total} RMB`;
}


// Display Input Details and Ticket Cost at the time of page load
window.addEventListener('load', () => {
  const params = (new URL(document.location)).searchParams;
  const origin = params.get('origin');
  const destination = params.get('destination');
  const depart = params.get('depart-date');
  const rdate = params.get('return-date');
  const adultNum = params.get('adults');
  const childNum = params.get('children');
  const travelType = params.get('travel-class');
  flightId = params.get('flightId');
  displayInfo(origin, destination, depart, rdate, adultNum, childNum);
  addElement(adultNum, childNum);
  ticketCost(adultNum, childNum, travelType);
  document.getElementById('result-name').innerHTML = adultNum;
  
})

//Define flight price and renew it from the back end
let rNum = Math.floor(Math.random() * (100)) + 50;
$(function(){
  $.ajax({
    url: "http://localhost:8085/test/submit",
    type: "post",
    dataType: "json",
    data: flightId,
    success: function(data) {
      rNum = data.result
    },
    error: function(error) {
      window.alert(error.result)
      // window.location.href = "./index.html"
    }
  
  });
})

// Prints the Error message below the Passenger details.
function printErrorPassenger(message){
  document.getElementById('error-message-passenger').innerHTML = `Error: ${message} <br>`;
}

// Prints the Error message below the other details
function printErrorOther(message){
  document.getElementById('error-message-other').innerHTML = `Error: ${message} <br>`;
}

// Validate Passenger's Phone number / 10 digit /
function validatePhone(){
  let num = document.getElementById("p-number").value;
  if (num == ""){
    printErrorOther("Please enter phone number");
    return false;
  }
  if (isNaN(num)){
    printErrorOther("Please enter the correct phone number");
    return false;
  }

  if (num.indexOf('0')!== 0 ){
    printErrorOther("First digit of the phone number must be 0");
    return false;
  }
  return true;
}

// Validate if Payment Method is selected
function  validatePayment(){
  let payment = document.getElementById('payment-method').value;
  if (payment == "<--Select-->") {
    printErrorOther("Please select payment method");
    return false ;	
  }
  return true;
}

//Validate if Gender is selected
function validateGender(){
  if(!(document.getElementByClass('genderp-male').checked || document.getElementByClass('genderp-female').checked || document.getElementByClass('genderp-none').checked)){
    printErrorOther("Please select the Gender");
    return false;
  }
  return true ;
} 



// Custom Validation to be activated at the time of Form Submit
form.addEventListener("submit", (e) => {
  if(!(validatePhone() && validatePayment())){
    e.preventDefault();
  }else{
    console.log("hello")
    $.ajax({
      url: "http://localhost:8085/test/submit",
      type: "post",
      dataType: "json",
      data: $('#form').serialize(),
      success: function(data) {
        if(data.message == "success"){
          window.location.href = "./thankyou.html"
        }else{
          window.alert(data.result)
          // window.location.href = "./index.html"
        }
      },
      error: function(error) {
        console.log(error)
      }
  
    });
  }
});




