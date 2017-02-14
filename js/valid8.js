/**
 * Valid8 v0.92
 * @author  Jay El-Kaake
 * @requires jQuery (pretty much any version will work). Works best with Bootstrap.
 * 
 */
(function($) {
  var Valid8 = {
    validators: [],
    /**
     * Add a validation type
     * @param {[type]} className      [description]
     * @param {[type]} msg            [description]
     * @param {[type]} validationFunc [description]
     */
    add: function(className, msg, validationFunc) {
      Valid8.validators.push([className, msg, validationFunc]);
    },
    /**
     * Add an array of validation types
     * @param {[type]} arr [description]
     */
    addAll: function(arr) {
      for (var i = 0; i < arr.length; i++) {
        Valid8.validators.push(arr[i]);
      }
    },
    /**
     * Get the validation message for a given validation class name
     * given the value of the input.
     * @param  {[type]} val       [description]
     * @param  {[type]} className [description]
     * @return {[type]}           [description]
     */
    getValidationMsg: function(val, className) {
      for (var i = Valid8.validators.length - 1; i >= 0; i--) {
        var validator = Valid8.validators[i];
        if (validator[0] != className) {
          continue;
        }
        if (!validator[2](val)) {
          return validator[1];
        }
        return null;
      }
      return null;
    },
    /**
     * Is a field valid for the given validation class name?
     * @param  {[type]}  val       [description]
     * @param  {[type]}  className [description]
     * @return {Boolean}           [description]
     */
    isValid: function(val, className) {
      for (var i = Valid8.validators.length - 1; i >= 0; i--) {
        var validator = Valid8.validators[i];
        if (validator[0] != className) {
          continue;
        }
        if (!validator[2](val)) {
          return false;
        }
        return true;
      }
      return true;
    },
    /**
     * Is a value empty?
     * @return {Boolean}
     */
    isEmpty: function(v) {
      return ((v === null) || (v.length === 0)); // || /^\s+$/.test(v));
    }
  };

  /**
   * Let's define a bunch of validations
   */
  Valid8.addAll([
    ['required', 'This is a required field.',
      function(v) {
        return !Valid8.isEmpty(v);
      }
    ],
    ['validate-number', 'Please enter a valid number in this field.',
      function(v) {
        return Valid8.isEmpty(v) || (!isNaN(v) && !/^\s+$/.test(v));
      }
    ],
    ['validate-digits', 'Please use numbers only in this field. please avoid spaces or other characters such as dots or commas.',
      function(v) {
        return Valid8.isEmpty(v) || !/[^\d]/.test(v);
      }
    ],
    ['validate-alpha', 'Please use letters only (a-z) in this field.',
      function(v) {
        return Valid8.isEmpty(v) || /^[a-zA-Z]+$/.test(v);
      }
    ],
    ['validate-alphanum', 'Please use only letters (a-z) or numbers (0-9) only in this field. No spaces or other characters are allowed.',
      function(v) {
        return Valid8.isEmpty(v) || !/\W/.test(v);
      }
    ],
    ['validate-creditcard', 'Please enter a valid credit card number.',
      function(v) {
        var ccreg = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
        return Valid8.isEmpty(v) || ccreg.test(v.replace(/ /g,''));
      }
    ],
    ['validate-date', 'Please enter a valid date.',
      function(v) {
        //var test = new Date(v);
        //return Valid8.isEmpty(v) || !isNaN(test);
        if (Valid8.isEmpty(v)) return true;
        var regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        if (!regex.test(v)) return false;
        var d = new Date(v);
        return (parseInt(RegExp.$2, 10) == (1 + d.getMonth())) &&
          (parseInt(RegExp.$1, 10) == d.getDate()) &&
          (parseInt(RegExp.$3, 10) == d.getFullYear());
      }
    ],
    ['validate-email', 'Please enter a valid email address. For example john@example.com.',
      function(v) {
        return Valid8.isEmpty(v) || /\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/.test(v);
      }
    ],
    ['validate-url', 'Please enter a valid URL.',
      function(v) {
        return Valid8.isEmpty(v) || /^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i.test(v);
      }
    ],
    ['validate-date-au', 'Please use this date format: dd/mm/yyyy. For example 17-03-2006 for the 17th of March, 2006.',
      function(v) { // Bootstrap stores dates as 2015-02-20 yyyy-mm-dd
        if (Valid8.isEmpty(v)) return true;
        var regex = /^(\d{4})-(\d{2})-(\d{2})$/;
        if (!regex.test(v)) return false;
        var d = new Date(v.replace(regex, '$2/$3/$1'));
        return (parseInt(RegExp.$2, 10) == (1 + d.getMonth())) &&
          (parseInt(RegExp.$3, 10) == d.getDate()) &&
          (parseInt(RegExp.$1, 10) == d.getFullYear());
      }
    ],
    ['validate-currency-dollar', 'Please enter a valid $ amount. For example $100.00 .',
      function(v) {
        // [$]1[##][,###]+[.##]
        // [$]1###+[.##]
        // [$]0.##
        // [$].##
        return Valid8.isEmpty(v) || /^\$?\-?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}\d*(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/.test(v);
      }
    ],
    ['validate-selection', 'Please make a selection',
      function(v, elm) {
        return elm.options ? elm.selectedIndex > 0 : !Valid8.isEmpty(v);
      }
    ],
    ['validate-one-required', 'Please select one of the above options.',
      function(v, elm) {
        var p = elm.parentNode;
        var options = p.getElementsByTagName('INPUT');
        return $A(options).any(function(elm) {
          return $F(elm);
        });
      }
    ]
  ]);


  /**
   * Alright, here's the setup of our page
   * so we don't have to do anything.
   */
  $(document).ready(function() {
    $("form").each(function() {
      var $form = $(this);


      // Check a single field for validity
      var checkField = function($input) {
        var isValid = true;

        var validationMsg;
        if($input.next('.validation-msg').length === 0) {
          $input.after("<div class='validation-msg' style='display:none;'></div>");
        }
        var $vmsg = $input.next('.validation-msg');

        var classes = $input.attr('class') ? $input.attr('class').split(' ') : [];
        $(classes).each(function(i, className) {
          validationMsg = validationMsg || Valid8.getValidationMsg($input.val(), className);
          if (validationMsg) {
            isValid = false;
          }
        });

        if (!isValid) {
          $vmsg.html(validationMsg).show();
        } else {
          $vmsg.hide();
        }

        if (isValid) {
          $input.addClass('valid-input').removeClass("invalid-input").parent().removeClass('has-error');
        } else {
          $input.removeClass("valid-input").addClass('invalid-input').parent().addClass('has-error');
        }
      };

      // Check all Fields
      var checkFields = function() {
        $form.find(':input:not(type=hidden])').each(function() {
          checkField($(this));
        });
      }

      // Add input checkers.
      $form.find(':input:not(type=hidden])').each(function() {
        var $input = $(this);
        $input.change(function(e) {
          checkField($input);
        });
      });

      // Add form complete check
      $form.change(function(e) {
        if($form.find('.has-error').length > 0) {
          $form.find('[type=submit]').addClass('disabled');
        } else {
          $form.find('[type=submit]').removeClass('disabled');
        }
      });

      // Check all fields upon submit
      $form.on('submit', function() {
        var $submit = $form.find('[type=submit]');
        checkFields();
        if($form.find('.has-error').length > 0) {
          $submit.addClass('disabled');
          return false;
        } else {
          $submit.removeClass('disabled');
          return true;
        }
      });

    });

    // We need a default validation CSS style so we don't require everyone
    // to define styles or include a CSS file if they don't want to.
    $('body').append("<style> .validation-msg { color: red; margin-left: 7px; font-size: 80%; text-align: left; } </style>");
  });
})(jQuery);
