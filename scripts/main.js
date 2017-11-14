    $(document).ready(function(){
       $("#mySearch").keyup(function(event){
        if(event.keyCode === 13){
            $("#submitBtn").click();
        }
    });
   });

    $("#submitBtn").click(function(){

      $("#results").html("");


      var $searchValue = $("#mySearch").val();

      $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search="+$searchValue+"&limit=20&callback=?",
        type: 'GET',
        dataType: 'JSONP',
        pilimit: '10',
        success: function(data){
            console.log(data);
            
            for(var i=0; i<data[1].length; i++){

               $('#results').append(`<div id='resLists'><a href='${data[3][i]}' target='_blank'><div class='card horizontal hoverable'><div class='row'><div id='image${i}' class='card-image col s3 valign-wrapper'></div><div class='card-stacked col s9'><div class='card-content'><span class='card-title truncate'>${data[1][i]}</span><p>${data[2][i]}&nbsp;</p></div></div></div></div></a></div>`);
               
               
           }

           $.ajax({
            url: "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&wbptterms=description&gpssearch="+$searchValue+"&gpslimit=20",
            method: "GET",
            dataType: "jsonp",
            success: function(newData){
                console.log(newData);
                for(var i=0; i<20; i++){
                    if(newData.query.pages[i].hasOwnProperty("thumbnail") === true){
                        $('#image'+ (newData.query.pages[i].index -1)).html("<img src="+newData.query.pages[i].thumbnail.source+">");
                    } 
                }
            },
            error: function(){
                console.log("Error, Something's wrong.");
            }
        });
       },
       error: function(){
        alert('Error, Please refresh the page');
    }
});
      $("#mySearch").val('');
  });
    $("#clear").click(function() {
      $("#mySearch").val("").focus();
      $("#results").html("");
  });