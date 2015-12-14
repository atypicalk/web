Template.footer.events({

});
Template.footer.rendered = function() {
	$(document).ready(function(){
    $('.collapsible .popout').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  });

}
