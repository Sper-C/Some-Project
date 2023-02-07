$(document).ready(function () {
	setDKHPMenuHeight();
	setActiveMenu();
});

function setActiveMenu() {
	var file = $.url().attr('file');
	var inps = $('#page-body-menu ul li a');
	$('#page-body-menu ul li a').removeClass('active');

	$.each(inps, function (idx, item) {
		if ($(this).attr('href').toLowerCase().search(file.toLowerCase()) >= 0) {
			if (file.toLowerCase() == 'dangkyhocphan.aspx' || file.toLowerCase() == 'dangkychuyende.aspx') {
				$(this).addClass('active');
			} else {
				var pid = $.url().param('pid');
				if ($(this).attr('id') == 'm_' + pid) {
					$(this).addClass('active');
				}
			}
		}
	});
}


function setDKHPMenuHeight() {
	$('#page-body-menu').css('height', 'auto');
	$('#page-body-menu').height(Math.max($('#page-body-menu').height(), $('#page-body-content').height()));
}

if (!String.prototype.trim) {
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g, '');
	};
}

(function () {

	var special = jQuery.event.special,
        uid1 = 'D' + (+new Date()),
        uid2 = 'D' + (+new Date() + 1);

	special.scrollstart = {
		setup: function () {

			var timer,
                handler = function (evt) {

                	var _self = this,
                        _args = arguments;

                	if (timer) {
                		clearTimeout(timer);
                	} else {
                		evt.type = 'scrollstart';
                		jQuery.event.handle.apply(_self, _args);
                	}

                	timer = setTimeout(function () {
                		timer = null;
                	}, special.scrollstop.latency);

                };

			jQuery(this).bind('scroll', handler).data(uid1, handler);

		},
		teardown: function () {
			jQuery(this).unbind('scroll', jQuery(this).data(uid1));
		}
	};

	special.scrollstop = {
		latency: 300,
		setup: function () {

			var timer,
                    handler = function (evt) {

                    	var _self = this,
                        _args = arguments;

                    	if (timer) {
                    		clearTimeout(timer);
                    	}

                    	timer = setTimeout(function () {

                    		timer = null;
                    		evt.type = 'scrollstop';
                    		jQuery.event.handle.apply(_self, _args);

                    	}, special.scrollstop.latency);

                    };

			jQuery(this).bind('scroll', handler).data(uid2, handler);

		},
		teardown: function () {
			jQuery(this).unbind('scroll', jQuery(this).data(uid2));
		}
	};

})();