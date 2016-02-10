//fix ids from cloned objects
function fixIds(elem, cntr) {
    $(elem).find("[id]").add(elem).each(function() {
        this.id = this.id.replace(/\d+$/, "") + cntr;
    })
}

var cloneCntr = 1; //variable for cloned objects
var box = $(document).on("click", "#AddTagGroup", function(e) {
	var p = $("#TagPanelX1").clone(true,true,true);
	$("#TagPanels").append(p);
	p.show();
	exit();

	bootbox.prompt({
		title: "Enter the name of the new group:",
		value: "NewGroup",
		inputType: "text",
		placeholder: "Name",
		show: true,
		animate: false,
		callback: function(result) {
			if (result !== null) {
				//Clone panel
				var panel = $("#TagPanelX1").clone();

				//fix id and hide
				fixIds(panel, cloneCntr+1);
				panel.hide();

				//append panel into Tag Groups
				$('#TagPanels').append(panel);

				//fix id and texts
				$('#' + $(panel).attr("id") + ' h3').each(function() {
					$(this).nextUntil('h3');
					$(this).text(result); //fix tag group text according to text entered
					//alert($(this).text());
					fixIds($(this), cloneCntr+1); //fix id of label h3
				});
				$('#' + $(panel).attr("id") + ' li').each(function() {
					$(this).nextUntil('li');
					fixIds($(this), cloneCntr+1); //fix id of label h3
				});
				//show panel and increment ids
				panel.show();
				cloneCntr++;



			}
		}
	});
});
//get input text selected and with focus
box.bind('shown.bs.modal', function(){
	$('input').select(); //this select the input box
	//$('input').focus(); //this force the focus
});





var app = angular.module('app', ['xeditable']) //'ngAnimate', 'ui.bootstrap'
.run(function(editableOptions) {
	editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
})

.controller('PanelTitleCtrl', function($scope) {
	$scope.user = {
		name: 'Panel1'
	};
})

.controller('GroupCtrl', function($scope){
	$scope.comments = [
		{text: 'test'}
	];
	$scope.addPanelGroup = function() {
		alert('add new group');
    };
})

.controller('AlertDemoCtrl', function($scope) {
  $scope.alerts = [
    { type: 'danger', msg: 'test1' },
    { type: 'success', msg: 'test2' },
	{ type: 'success', msg: 'test3' }
  ];

  $scope.addAlert = function() {
    $scope.alerts.push({ type: 'info', msg: 'Another message TEST' });
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
})

.directive("foo", function($scope) {
	return {
		template: "<div>the template</div>"
	};

	$scope.showSomething = function() {
		alert(1);
	};
})

.directive('compileDirective', function($compile){
	return {
		name: 'E',
		templateUrl: '../app/template.html',
		controller: function($scope){
			console.log("do stuff")
		},
		link: function(scope, elm, attrs) {}
	};
});







/*app.controller('AppCtrl', function($scope){
	$scope.newElement = angular.element($("#TagPanelX1").clone().attr("id","TagPanelX2").html());
});

app.controller('AppCtrl', function($scope){
	$scope.addPanelGroup = function() {
		alert(111);
    };
});*/


/*.directive('compileDirective2', function(){
	return{
		scope:{},
		restrict:'E',
		template:'<h1>XXXXXXXXXX</h1>',
		link:function(scope,element,attrs){
			element.bind('click',function(e){
				alert(2);
			})
		}
	}
})
.directive('compileDirective', function($compile){
	return {
		name: 'E',
		template: $('#TagPanelX1').html(), //'<div>NEW COMPILE TEMPLATE </div>', 
		controller: 'TestCtrl',
		link: function(scope, elm, attrs) {
			var compileIt			= $compile(scope.newElement);
			var content				= compileIt(scope);
			elm.append(content);
		}
	};
});*/






















/*


$("#TagGroupPanelHeadingX").html(
	$compile(
	"<button ng-click='count = count + 1' ng-init='count=0'>Increment</button><span>count: {{count}} </span>"
	)(scope)
);







//delete panel
$("#DeleteTagGroupX").on("click", function(event){
	$(this).parents(".panel:first").remove();
});


$("#EditTagGroupX").on("click", function(event){
    $(this).parents("panel-title h3:first").text('edited title');
});


$(".panel-title a").editable({
    url: '/post',
    responseTime: 100,
    response: function(settings) {
        if(settings.data.value == 'err') {
           this.status = 500;
        this.responseText = 'Validation error!';
        } else {
           this.responseText = '';
        }
    }
});





$("#GroupTagPopup").on("click", function(event){
	alert(event.text());
	var listItem = document.getElementById("#GroupTagPopup");
	alert( "Index: " + $( "li" ).index( listItem ) );
	alert(listItem);
});


$(".a").bind("click", function() {
	alert($(this).text());
    //window["DeleteTagGroup" + number]();
});



var box = $(document).on("click", "#DeleteTagGroup", function(e) {
	var groupname = "";
	$('#' + $(this).attr("id") + ' h3').each(function() {
		$(this).prevUntil('h3');
		groupname = $(this).text(result);
	});

	bootbox.dialog({
	  message: 'The group [' + groupname  + '] is about to be deleted.\n\nDo you confirm?',
	  title: "Deletion",
	  buttons: {
	    main: {
	      label: "Cancel",
	      className: "btn-default",
	      callback: function() {
	        alert('canceled');
	      }
	    },
	    danger: {
	      label: "Delete",
	      className: "btn-danger",
	      callback: function() {
	        alert('deleted');
	      }
	    },
	  }
	});
});



/*$('#DeleteTagGroup').click(function() {
	var panel = '#TagPanel3'+ $('#GroupTitle3').text();
	$(panel).remove();
	$('#modalDeleteTagGroup').modal('hide');
});




$('#EditTagGroup').click(function() {
	alert('edit');
});



$('#modalEditTagGroup').on('shown.bs.modal', function() {
	$('#inputEditGroupName').val($('#GroupTitle3').text());
    $('#inputEditGroupName').select();
    $('#inputEditGroupName').focus();
});
$('#modalDeleteTagGroup').on('shown.bs.modal', function() {
	$("#deleteTagGroupQuestion").text(message);
	var content = 'The group [' + $('#GroupTitle3').text()  + '] is about to be deleted.\n\nDo you confirm?';
	var contentArray = content.split(/\n/);
	$('#deleteTagGroupQuestion').html('');
	$.each(contentArray, function(){
		$('#deleteTagGroupQuestion').append('<p>' + this + '</p>');
	});
});
*/