define(["domReady", "jquery", "underscore"],
    function (domReady, $, _, CancelOnEscape, CreateMicrositeUtilsFactory) {
        "use strict";
        // microsite form
        var new_microsite_form = function(e) {
          e.preventDefault();
          $('.wrapper-create-element').removeClass('is-shown');
          $('.wrapper-create-microsite').addClass('is-shown');
        }
        var ajax_cancel_microsite = function(e) {
          $('.wrapper-create-microsite').removeClass('is-shown');
        }
        var ajax_call_create_microsite = function(e) {
          e.preventDefault();
          var url = '/create-microsite/';
          var formData = new FormData();
          formData.append('display_name',$('#new-microsite-name').val());
          formData.append('logo',$('#new-microsite-logo').prop("files")[0]);
          formData.append('primary_color',$('#new-microsite-primary_color').val());
          formData.append('secondary_color',$('#new-microsite-secondary_color').val());
          formData.append('language',$('#language-value').val());
          $.ajax({
            url:url,
            data:formData,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function(data) {
              $('.wrapper-create-microsite').removeClass('is-shown');
              location.reload();
            }
          })
        }
        var onReady = function () {
            $('.new-microsite-button').bind('click',new_microsite_form);
            $('.new-microsite-save').bind('click',ajax_call_create_microsite);
            $('.new-microsite-cancel').bind('click',ajax_cancel_microsite);
            //$('#course-index-tabs .microsite-tab').bind('click', showTab('microsite'));
        };

        domReady(onReady);

        return {
            onReady: onReady
        };
    });
