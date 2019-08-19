$(function() {
    $.datepicker.setDefaults(
        $.extend($.datepicker.regional[""])
    );
    $("#startdatepicker").datepicker({
        dateFormat: "mm/dd/yy",
        onSelect: function (date) {
            var date2 = $('#startdatepicker').datepicker('getDate');
            date2.setDate(date2.getDate() + 1);
            $('#enddatepicker').datepicker('setDate', date2);
            //sets minDate to startdatepicker date + 1
            $('#enddatepicker').datepicker('option', 'minDate', date2);
        }
    });

    $('#enddatepicker').datepicker({
        dateFormat: "mm/dd/yy",
        onClose: function () {
            var startdatepicker = $('#startdatepicker').datepicker('getDate');
            var enddatepicker = $('#enddatepicker').datepicker('getDate');
            //check to prevent a user from entering a date below date of startdatepicker
            if (enddatepicker <= startdatepicker) {
                var minDate = $('#enddatepicker').datepicker('option', 'minDate');
                $('#enddatepicker').datepicker('setDate', minDate);
            }
        }
    });

    $("#theform").on("submit",function(e){
        e.preventDefault();
        var values = $(this).serializeArray();
        var custom = {
            "type": "custom",
            "format": values.find(obj => obj.name == 'format').value
        };

        if(values.find(obj => obj.name == 'startDate').value != ""){
            var date = [values.find(obj => obj.name == 'startDate').value, values.find(obj => obj.name == 'endDate').value];
        }

        if([values.find(obj => obj.name == 'segmentBy').value] == "don't sort"){
            var jsonBody = {
                "func": "getMetrics",
                "req": {
                    "vidIds": [values.find(obj => obj.name == 'videoId').value],
                    "fields": [
                        ...(values.find(obj => obj.name == 'browser') ? ['browser'] : []),
                        ...(values.find(obj => obj.name == 'startedPlaying') ? ['startedPlaying'] : []),
                        ...(values.find(obj => obj.name == 'interactions') ? ['interactions'] : []),
                        ...(values.find(obj => obj.name == 'embedLoc') ? ['embedLoc'] : []),
                        ...(values.find(obj => obj.name == 'activeViews') ? ['activeViews'] : []),
                        ...(values.find(obj => obj.name == 'viewers') ? ['viewers'] : []),
                        ...(values.find(obj => obj.name == 'isFirstView') ? ['isFirstView'] : []),
                        ...(values.find(obj => obj.name == 'isFirstActive') ? ['isFirstActive'] : []),
                        ...(values.find(obj => obj.name == 'widgets') ? ['widgets'] : []),
                        ...(values.find(obj => obj.name == 'maxTime') ? ['maxTime'] : []),
                        ...(values.find(obj => obj.name == 'vidId') ? ['vidId'] : []),
                        ...(values.find(obj => obj.name == 'maxWhen') ? ['maxWhen'] : []),
                        ...(values.find(obj => obj.name == 'playWhen') ? ['playWhen'] : []),
                        ...(values.find(obj => obj.name == 'device') ? ['device'] : []),
                    ],
                    "limit": Number(values.find(obj => obj.name == 'limit').value),
                    "blockWwx": (values.find(obj => obj.name == 'blockWwx').value == 'true'),
                    "ignoreEmbed": (values.find(obj => obj.name == 'ignoreEmbed').value == 'true'),
                    ...(date ? {"betweenDates": date} : {}),
                },
                "res": {
                    "func": "aggregate",
                    "req": {
                        "services": [
                            ...(values.find(obj => obj.name == 'views_service') ? ['views'] : []),
                            ...(values.find(obj => obj.name == 'impressions_service') ? ['impressions'] : []),
                            ...(values.find(obj => obj.name == 'mobileVsDesktop_service') ? ['mobileVsDesktop'] : []),
                            ...(values.find(obj => obj.name == 'devices_service') ? ['devices'] : []),
                            ...(values.find(obj => obj.name == 'activeViews_service') ? ['activeViews'] : []),
                            ...(values.find(obj => obj.name == 'interactions_service') ? ['interactions'] : []),
                            ...(values.find(obj => obj.name == 'viewers_service') ? ['viewers'] : []),
                            ...(values.find(obj => obj.name == 'retention_service') ? ['retention'] : []),
                            ...(values.find(obj => obj.name == 'custom_service') ? [custom] : []),
                        ]
                    }
                }
            }
        }
        else {
            var jsonBody = {
                "func": "getMetrics",
                "req": {
                    "vidIds": [values.find(obj => obj.name == 'videoId').value],
                    "fields": [
                        ...(values.find(obj => obj.name == 'browser') ? ['browser'] : []),
                        ...(values.find(obj => obj.name == 'startedPlaying') ? ['startedPlaying'] : []),
                        ...(values.find(obj => obj.name == 'interactions') ? ['interactions'] : []),
                        ...(values.find(obj => obj.name == 'embedLoc') ? ['embedLoc'] : []),
                        ...(values.find(obj => obj.name == 'activeViews') ? ['activeViews'] : []),
                        ...(values.find(obj => obj.name == 'viewers') ? ['viewers'] : []),
                        ...(values.find(obj => obj.name == 'isFirstView') ? ['isFirstView'] : []),
                        ...(values.find(obj => obj.name == 'isFirstActive') ? ['isFirstActive'] : []),
                        ...(values.find(obj => obj.name == 'widgets') ? ['widgets'] : []),
                        ...(values.find(obj => obj.name == 'maxTime') ? ['maxTime'] : []),
                        ...(values.find(obj => obj.name == 'vidId') ? ['vidId'] : []),
                        ...(values.find(obj => obj.name == 'maxWhen') ? ['maxWhen'] : []),
                        ...(values.find(obj => obj.name == 'playWhen') ? ['playWhen'] : []),
                        ...(values.find(obj => obj.name == 'device') ? ['device'] : []),
                    ],
                    "limit": Number(values.find(obj => obj.name == 'limit').value),
                    "blockWwx": (values.find(obj => obj.name == 'blockWwx').value == 'true'),
                    "ignoreEmbed": (values.find(obj => obj.name == 'ignoreEmbed').value == 'true'),
                    ...(date ? {"betweenDates": date} : {})
                },
                "res": {
                    "func": "segment",
                    "req": {
                        "by": values.find(obj => obj.name == 'segmentBy').value
                    },
                    "res": {
                        "func": "aggregate",
                        "req": {
                            "services": [
                                ...(values.find(obj => obj.name == 'views_service') ? ['views'] : []),
                                ...(values.find(obj => obj.name == 'impressions_service') ? ['impressions'] : []),
                                ...(values.find(obj => obj.name == 'mobileVsDesktop_service') ? ['mobileVsDesktop'] : []),
                                ...(values.find(obj => obj.name == 'devices_service') ? ['devices'] : []),
                                ...(values.find(obj => obj.name == 'activeViews_service') ? ['activeViews'] : []),
                                ...(values.find(obj => obj.name == 'interactions_service') ? ['interactions'] : []),
                                ...(values.find(obj => obj.name == 'viewers_service') ? ['viewers'] : []),
                                ...(values.find(obj => obj.name == 'retention_service') ? ['retention'] : []),
                                ...(values.find(obj => obj.name == 'custom_service') ? [custom] : []),
                            ]
                        }
                    }
                }
            }
        }

        setTimeout(function(){
            var getMetrics = $.ajax({
              type: "POST",
              url: "https://jaffa.wirewax.com/custom/service",
              dataType: "json",
              processData: false,
              contentType: "application/json",
              data: JSON.stringify(jsonBody)
            });

            getMetrics.done(function(response) {
              console.log(response);
              download(JSON.stringify(response), 'metrics_report.json', 'application/json');
            });

            getMetrics.fail(function(jqXHR, textStatus) {
              alert( "Getting metrics failed: " + textStatus );
              console.log(jqXHR);
            });
        }, 1000);
    });

    function download(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }
});

function imposeMinMax(el){
  if(el.value != ""){
    if(parseInt(el.value) < parseInt(el.min)){
      el.value = el.min;
    }
    if(parseInt(el.value) > parseInt(el.max)){
      el.value = el.max;
    }
  }
}
