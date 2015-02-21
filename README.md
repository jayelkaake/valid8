# Simple Bootstrap Responsive Form Validation
Valid8 is a super simple javascript for validation script built using jQuery that works really well
with responsive bootstrap websites.

What differs this validation script from other ones is that it it **does not require any javascript or HTML** to be written
in your pages where you want validation to occur. Just Include the script, add class names to your HTML elements and you're good to go!

## Usage
To use Valid8 simply include the valid8.js file after jquery and bootstrap (if you're using bootstrap):

    <script src="js/valid8.min.js"></script>
Then just add the CSS class name of the validation you want to each of your fields. Here are the validation classes available:

|Class Name|Erorr Message|
|-|-|
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