$(document).ready(()=>{


function sendPost(udata,callback){

	$.ajax({
      method: "POST",
      url: "http://localhost:8080/api/chat/reply",
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(udata),
      success: function(res) {
        //Show status
        console.log(res);
        callback(res);
        
      },
      error: function(error) {
        //Show status
        callback(error);
        console.log(error);
      }
    });
}



var me = {};
me.avatar = "./img/baymax.png";

var you = {};
you.avatar = "./img/avatar.png";;

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}            

//-- No use time. It is a javaScript effect.
function insertChat(who, text){

    var control = "";
    var date = formatAMPM(new Date());
    
    if (who == "me"){
        
        control = '<li style="width:100%">' +
                        '<div class="msj macro">' +
                        '<div class="avatar"><img class="img-circle" style="width:100%;" src="'+ me.avatar +'" /></div>' +
                            '<div class="text text-l">' +
                                '<p>'+ text +'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';                    
    }else{
        control = '<li style="width:100%;">' +
                        '<div class="msj-rta macro">' +
                            '<div class="text text-r">' +
                                '<p>'+text+'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="'+you.avatar+'" /></div>' +                                
                  '</li>';
    }
$("ul").append(control);
}

$(".mytext").on("keyup", function(e){
    if (e.which == 13){
        var text = $(this).val();
        if (text !== ""){
        	var data = {};
        	data.userMessage = text;
        	insertChat("you", text);
        	sendPost(data,(response)=>{
        		insertChat("me", response.reply);
        	});              
            $(this).val('');
        }
    }
});

insertChat("me", "Hi how may i help you...");  



})