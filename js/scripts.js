// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
// this global variable is mimicing a database
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
 //display Contact details method - will display Contact info in the DOM, AddressBook object as an argument (best practice to put it here instead of with the form submission listener, will make it easier in the future)
  var contactsList = $("ul#contacts"); //save our Jquery ul#contacts element in a variable, jquery won't have to query the DOM again to get this info
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  }); //iterate through the Contact s saved int eh AddressBook proided as an argument to displayContactDetails(). assign each Contact to an <li> with a dynamic id matching the Contact's id property.- VImp bc later we can retrieve this id stored int eh <li> to use with our findContact() prototype method to locate an entire Contact object.
  contactsList.html(htmlForContactInfo);
};

$(document).ready(function() {
  $("form#new-contact").submit(function(event) { //form submission event listener
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();//gather user provided form input from the form fields
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber); //create a new Contact object, passing in this gathered information as arguments
    addressBook.addContact(newContact); //adding the newContact to our AddressBook using the addContact() method.
    displayContactDetails(addressBook); //new method we can call whenever we add a new Contact.

    // console.log(addressBook.contacts); //log the list of Contacts in our AddressBook to the console, to double-check the new contact has been added.
  })
})
