$.ready(function(){

        console.log("ready");
$("#formBtn").click(function(){
    console.log("clicked");
    if (document.getElementById('isCheck').checked && !window.isSending) {
        showIsSending();
        var classID = $("#formInput").val();
        var JxbId = classIDToJxbID(classID);
        if (undefined === JxbId) {
            alert("Class id is illegal. Please confirm your input.");
        }else{
            sendRequest(JxbId);
        }
    }
});


function showIsSending() {
    var formBtn = $('#formBtn i')[0];
    formBtn.removeClass("fa-arrow-right");
    formBtn.addClass("fa-refresh");
    window.isSending = true;
}

function showPrepareSend() {
    var formBtn = $('#formBtn i')[0];
    formBtn.removeClass("fa-refresh");
    formBtn.addClass("fa-arrow-right");
    window.isSending = false;
}


/**
The author of this function is GD Sun.
**/
function sendRequest(jxbID) {
    var task;
    window.task = task;
    var cleared = false;
    function submitChoice(jxbID) {
    	$.get(data_url, data = {
    		jxbid: jxbID,
    		xklx: 3,                                      // I wonder those ( 'xklx' and 'xkzy' ) represent what.
    		xkzy: 3,
    		ysJxbid: ''
    	}, function(resp) {
    		data = JSON.parse(resp);
    		if (!data.success) {
    			console.log(data.message);
    		} else {
    			console.log('Finished.');
    			clearInterval(task);
                showPrepareSend();
    		}
    	});
    }

    function getTime() {
    	$.get(check_time_url, function(resp) {
    		data = JSON.parse(resp);
    		minute = parseInt(/.*(\d\d)/.exec(data.stime)[1]);
    		if (minute === 0) {
    			console.log('Now!');
    			if (!cleared) {
    				clearInterval(task);
    				task = setInterval(submitChoice, 1000);
    				cleared = true;
    			}
    		} else {
    			console.log('' + (60 - minute) + ' minutes left');
    		}
    	});
    }

    task = setInterval(getTime, 500);
}

});
