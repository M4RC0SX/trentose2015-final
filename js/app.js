/* SantaModel assists santa's helpers in packing children's requests.
 * It provides quality control by checking if the requests are being
 * fulfilled
 */

var SantaModel = {
    requests: [],
    current: {},
    /* Initializes the model with a list of requests,
     * and sets the first one as the current one
     */
    init: function (list) {
        SantaModel.requests=list;
        SantaModel.current=SantaModel.requests.shift();
    },

    /* It moves "current" to the next request */
    next: function () {
        SantaModel.current=SantaModel.requests.shift();
    },

    /* Returns the current request.
     * If all requests have been processed (there is no current one), it returns null
     */
    getCurrentRequest: function () {
        return SantaModel.current;
    },

    /* Packs the given item if it fulfills the current request.
     * returns 1 if the given item fulfills the request (= answer)
     * returns 0 if the given item does not fulfill the request
     */
    pack: function (item) {
        if(item==SantaModel.current.answer){
            return 1;
        } else {
            return 0;
        }
    }
};

var SantaView = {
    questionBox : {},
    questionItemsBox : {},
    resultBox : {},
    init: function(){
        SantaView.questionBox = $(".question");
        SantaView.questionItemsBox = $(".questionItems");
        SantaView.resultBox = $(".result");
    },
    clearQuestion : function(){
        SantaView.questionBox.html("");
        SantaView.questionItemsBox.html("");
    },
    showQuestion: function(question){
        SantaView.questionBox.append(question.question);
        for(var i=0;i<question.options.length;i++){
            var option = question.options[i];
            var element = jQuery.parseHTML("<li>"+option+"</li>");
            $(element).on("click",function(e){
                SantaController.clickElement(e.toElement.innerHTML);
            });
            SantaView.questionBox.append(element);
        }
    },
    showResults : function(points){
        SantaView.resultBox.append("Total points: "+points);
    }
}

var SantaController = {
    points : 0,
    init: function(){
        SantaModel.init(requests);
        SantaView.init();
        SantaView.showQuestion(SantaModel.getCurrentRequest());
        SantaController.points=0;
    },
    clickElement : function(element){
        if(SantaModel.pack(element)==0){
            SantaController.points--;
            alert("wrong answer");
        } else {
            SantaController.points++;
            SantaModel.next();
            SantaView.clearQuestion();
            var question = SantaModel.getCurrentRequest();
            if(question){
                SantaView.showQuestion(question);
            } else {
                SantaView.showResults(SantaController.points);
            }
        }
    }
}

$(function(){
    SantaController.init();
});


