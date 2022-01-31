toastr.options = {
    "closeButton": true,
    "debug": true,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "2000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

function success_toastr(msg) {
    toastr.success(msg);
}

function info_toastr(msg) {
    toastr.info(msg);
}

function error_toastr(msg) {
    toastr.error(msg);
}
let blockUI = '';

function loading(obj) {
    blockUI = new KTBlockUI(obj, {
        message: '<div class="blockui-message"><span class="spinner-border text-primary"></span> Loading...</div>',
    });
    blockUI.block();
}

function loaded(obj) {
    blockUI.release();
}

function number_only(obj) {
    $('#' + obj).bind('keypress', function(event) {
        var regex = new RegExp("^[0-9]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    });
}

function select2(obj, title) {
    $('#' + obj).select2({
        width: '100%',
        placeholder: title
    });
}

function datepicker(obj) {
    $('#' + obj).datepicker({
        todayHighlight: true,
        autoclose: true,
        format: 'dd-mm-yyyy',
        orientation: "bottom left"
    });
}

function datepicker_start(obj) {
    $('#' + obj).datepicker({
        todayHighlight: true,
        autoclose: true,
        format: 'dd-mm-yyyy',
        orientation: "bottom left",
        startDate: '0'
    });
}

function datepicker_end(obj) {
    $('#' + obj).datepicker({
        todayHighlight: true,
        autoclose: true,
        format: 'dd-mm-yyyy',
        orientation: "bottom left",
        endDate: '0'
    });
}

function format_ribuan(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function ribuan(obj) {
    $('#' + obj).keyup(function(event) {
        if (event.which >= 37 && event.which <= 40) return;
        // format number
        $(this).val(function(index, value) {
            return value
                .replace(/\D/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        });
        var id = $(this).data("id-selector");
        var classs = $(this).data("class-selector");
        var value = $(this).val();
        var noCommas = value.replace(/,/g, "");
        $('#' + id).val(noCommas);
        $('.' + classs).val(noCommas);
    });
}

function datepicker_start(obj) {
    $('#' + obj).datepicker({
        todayHighlight: true,
        autoclose: true,
        format: 'yyyy-mm-dd',
        orientation: "bottom left",
        startDate: '0'
    });
}