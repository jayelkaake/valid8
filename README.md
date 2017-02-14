# Simple Bootstrap Responsive Form Validation
![](http://g.recordit.co/JfsfWSwHcf.gif)

Valid8 is a super simple javascript for validation script built using jQuery that works really well
with responsive bootstrap websites.

What differs this validation script from other ones is that it it **does not require any javascript or HTML** to be written
in your pages where you want validation to occur. Just Include the script, add class names to your HTML elements and you're good to go!

## Requirements
jQuery 1.9+ or Bootstrap 2+

## Installation
#### Install with bower
`bower install valid8` then include `js/valid8.js` or `js/valid8.min.js` wherever you want it.
#### Install normally
1. Git clone the repo (fork if you think you'll contribute). 
2. Include the valid8.js file after jQuery and Bootstrap (if you're using bootstrap):

  ```html
  <script src="js/valid8.min.js"></script>
  ```

## Usage

Just add the CSS class name of the validation you want to each of your fields and valid8 will automatically prevent form submissions until the data is valid. 

Here are the validation classes available:


|Class Name|Erorr Message|
|:---------|:-------------------------|
|required | This is a required field.|
|validate-number | Please enter a valid number in this field.|
|validate-digits | Please use numbers only in this field. please avoid spaces or other characters such as dots or commas.|
|validate-alpha | Please use letters only (a-z) in this field.|
|validate-alphanum | Please use only letters (a-z) or numbers (0-9) only in this field. No spaces or other characters are allowed.|
|validate-date | Please enter a valid date.|
|validate-email | Please enter a valid email address. For example john@example.com.|
|validate-url | Please enter a valid URL.|
|validate-date-au | Please use this date format: dd/mm/yyyy. For example 17/03/2006 for the 17th of March, 2006.|
|validate-currency-dollar | Please enter a valid $ amount. For example $100.00 .|
|validate-credit card | Please enter a valid credit card number.<Br> **Note:** This will do some standard format checks on credit card numbers with or without spaces (doesn't matter). Obviously don't use this as your only credit card validity check.|


**That's it!**

##Examples
###Email Address Example

    <input class="form-control required validate-email" placeholder="Login E-mail" name="email" type="email">
Result when not an email: ![](demo/screenshots/notemail.png?raw=true)

###Website URL Example
    <input class="form-control required validate-url" placeholder="Your website URL. Example: http://www.magecredit.com" name="url" type="url">
Result when not an email: ![](demo/screenshots/noturl.png?raw=true)

### Signup Form Example
We wrote a demo for you at [demo/index.html][1]
![](demo/screenshots/form_example.png?raw=true)
[1]: demo/index.html
