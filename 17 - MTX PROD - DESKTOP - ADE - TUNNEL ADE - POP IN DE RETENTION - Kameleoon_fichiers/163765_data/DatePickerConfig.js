window.BaseDatePickerConfig = {};

(function() {
    var datePickerCustomClass = "wt-datepicker",
        clearTm,
        crossElem;

    crossElem = $('<div>' +
        '<svg viewBox="0 0 20 20">' +
        '<path d="M11.296,10l8.244,8.244l-1.296,1.296L10,11.296L1.756,19.54L0.46,18.244L8.704,10L0.46,1.756L1.756,0.46L10,8.704l8.244-8.244l1.296,1.296L11.296,10z"/>' +
        '</svg>' +
        '</div>');
    crossElem.addClass('wt-datepicker-cross');

    function __appendCross(inst) {
        setTimeout(function() {
            $(inst.dpDiv).append(crossElem);
            crossElem.on('click', function() {
                inst.input.datepicker('hide');
            });
        }, 0);
    }

    function _beforeShow(input, inst) {
        if (clearTm) {
            clearTimeout(clearTm);
            clearTm = null;
        }
        $(inst.dpDiv).addClass(datePickerCustomClass);
        __appendCross(inst);
    }

    function _onChangeMonthYear(y, m, inst) {
        __appendCross(inst);
    }

    function _onClose(input, inst) {
        clearTm = setTimeout(function() {
            $(inst.dpDiv).removeClass(datePickerCustomClass);
            crossElem.remove();
        }, 1000);

    }

    function getDefaultConfig() {
        return {
            beforeShow: _beforeShow,
            onClose: _onClose
        };
    }

    function getFrConfig() {
        return {
            onChangeMonthYear: _onChangeMonthYear,
            beforeShow: _beforeShow,
            onClose: _onClose,
            clearText: 'Effacer',
            clearStatus: '',
            closeText: 'Fermer',
            closeStatus: 'Fermer sans modifier',
            prevText: '&lt;Préc',
            prevStatus: 'Voir le mois précédent',
            nextText: 'Suiv&gt;',
            nextStatus: 'Voir le mois suivant',
            currentText: 'Courant',
            currentStatus: 'Voir le mois courant',
            monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            monthNamesShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun',
                'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
            monthStatus: 'Voir un autre mois',
            yearStatus: 'Voir un autre année',
            weekHeader: 'Sm',
            weekStatus: '',
            dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
            dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
            dayNamesMin: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
            dayStatus: 'Utiliser DD comme premier jour de la semaine',
            dateStatus: 'Choisir le DD, MM d',
            dateFormat: 'dd/mm/yy',
            firstDay: 1,
            initStatus: 'Choisir la date',
            isRTL: false
        }
    }

    window.BaseDatePickerConfig.getBaseConfigByLocale = function(lang) {

        switch (lang) {
            case 'fr':
                return getFrConfig();
            default:
                return getDefaultConfig();
        }
    }
})();