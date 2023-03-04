

// Top Form / radio round trip
function validateTripType( ) {
    let oneway  =  document.getElementById("oneway").value;
    let roundtrip =  document.getElementById ("roundtrip").value;
        if (oneway == false && roundtrip == false){
          alert ("Please select your flight type");
                return false;
       } 
                return true ;
    } 
      // Top Form/ From To
      
    function toAndFrom ( ) {
        let   From = document.getElementById (" origin“ ).value;
        let   To = document.getElementById (“ destination “).value;
            if ( From == null || From == " " ) {
                alert ( “ Please enter your departure”);
                return false ;
        }
            If ( To == “null” || From == " " ) {
                alert ( “ Please enter your destination”);
                return false ;
        }
            If ( From == To ) {
                alert ( “ origin should not be the same as destination”);
                return false ;
    }) 
     // Top Form/  Number of adult & children / System validation
     // Top Form / Travel class
    
    function travelClass ( ) {
        let class1 =document.getElementById ("travel-class").value;
        if (class1 ==” select class”) {
                alert ( “Please select class”) ;
                return false ;	
        }
                return true;
    }
    // Passenger / radio gender
    function genderValidate ( ) {
        let male = document.getElementById("genderp-male").value;
        let female = document.getElementById ("genderp-female “).value;
            if (male == false && female == false){
                alert (" Please select your gender“);
                return false;
           } 
                return true;
        } 
    
    // Passenger / Phone number / 10 digit /
    function phoneValidate (){
        let num = document.getElementById("p-number").value;
        if (num  === " "){
                alert ( "Please enter phone number" );
                return false;
        }
        if (isNan(num )){
                alert ( "Invalid number");
                return false;
        }
        if (num.length>10 || num.length<6 ){
                alert ( "Number should be between 6 to 10 digits");
                return false;
        }
        if (num.indexOf ('0')!== 0 ){
            alert ( "First number must be 0");
                return false;
        }
                return true;
        }
        
    
    // Passenger / Payment option 
    function  paymentValidate ( ) {
        let payment =document.getElementById ("payment-method").value;
        if (payment == ” select payment") {
                alert ( “Please select payment option) ;
                return false ;	
        }
                return true;
    }