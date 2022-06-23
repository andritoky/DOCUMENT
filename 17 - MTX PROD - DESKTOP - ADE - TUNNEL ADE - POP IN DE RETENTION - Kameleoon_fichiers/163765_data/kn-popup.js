class knPopup {
    constructor(options) {
        this.settings = {
            container: null,
            element: null,
            popup: null,
            autoOpen: false,
            background: true,
            backgroundClose: true,
            dragable: false,
            resizable: false,
            minSize: null,
            expandable: false,
            onClose: null,
            theme: 'default'
        };

        this.setSettings(options);
        this.prepareElement();
        this.preparePopup();
        this.autoCenterWindow();

        if(this.settings.dragable) {
            this.dragPopup();
        }

        if(this.settings.resizable) {
            this.resizePopup();
        }

        if(this.settings.expandable) {
            this.expandCollapsePopup();
        }

        this.TAB_KEY = 9;
        this.ESC_KEY = 27;
        this.tabbableNode = /input|select|textarea|button|object/;
        this.handleContentKeyDown = this.handleContentKeyDown.bind(this);
        this.tabbable = this.tabbable.bind(this);
        this.content.addEventListener('keydown', this.handleContentKeyDown);
    }

    static settings(options) {
        new knPopup(options);
    }

    static open(options) {
        this.settings.popup = options.popup != undefined ? options.popup : null;
        this.settings.background = options.background != undefined ? options.background : true;

        if(this.settings.popup) {
            this.popup = document.querySelector(this.settings.popup);

            if(this.popup) {
                if(this.settings.background) {
                    this.background = this.popup.querySelector('.kn-popup-background');
                }

                this.content = this.popup.querySelector('.kn-popup-content');
            }

            knPopup.openPopup.call(this);
        }
    }

    setSettings(options) {
        this.settings.container = options.container != undefined ? options.container : this.settings.container;
        this.settings.element = options.element != undefined ? options.element : this.settings.element;
        this.settings.popup = options.popup != undefined ? options.popup : this.settings.popup;
        this.settings.autoOpen = options.autoOpen != undefined ? options.autoOpen : this.settings.autoOpen;
        this.settings.background = options.background != undefined ? options.background : this.settings.background;
        this.settings.backgroundClose = options.backgroundClose != undefined ? options.backgroundClose : this.settings.backgroundClose;
        this.settings.dragable = options.dragable != undefined ? options.dragable : this.settings.dragable;
        this.settings.resizable = options.resizable != undefined ? options.resizable : this.settings.resizable;
        this.settings.minSize = options.minSize != undefined ? options.minSize : this.settings.minSize;
        this.settings.expandable = options.expandable != undefined ? options.expandable : this.settings.expandable;
        this.settings.onClose = options.onClose != undefined ? options.onClose : this.settings.onClose;
        this.settings.theme = options.theme != undefined ? options.theme : this.settings.theme;
    }

    prepareElement() {
        if(this.settings.element) {
            if(this.settings.container) {
                this.elements = this.settings.container.querySelectorAll(this.settings.element);
            } else {
                this.elements = document.querySelectorAll(this.settings.element);
            }
        }

        if(this.elements && this.elements.length > 0) {
            for(let i = 0, l = this.elements.length; i < l; i++) {
                this.elements[i].addEventListener('click', knPopup.openPopup.bind(this), false);
            }
        }
    }

    preparePopup() {
        if(this.settings.popup) {
            this.popup = document.querySelector(this.settings.popup);
        }

        if(this.popup) {
            this.popup.dataset.open = false;
            this.getElements();
            this.setTheme();

            if(this.settings.background && this.background && this.settings.backgroundClose) {
                this.background.addEventListener('click', this.closePopup.bind(this), false);
            }

            if(this.buttonClose) {
                this.buttonClose.addEventListener('click', this.closePopup.bind(this), false);
                this.buttonClose.addEventListener('mousedown', (event) => event.stopPropagation(), false);
            }

            if(this.buttonsCancel.length > 0) {
                for(let i = 0, l = this.buttonsCancel.length; i < l; i++) {
                    this.buttonsCancel[i].addEventListener('click', this.closePopup.bind(this), false);
                }
            }

            if(this.settings.autoOpen) {
                knPopup.openPopup.call(this);
            }
        }
    }

    getElements() {
        if(this.settings.background) {
            this.background = this.popup.querySelector('.kn-popup-background');
        }

        this.content = this.popup.querySelector('.kn-popup-content');
        this.header = this.popup.querySelector('.kn-popup-header');
        this.headerTitle = this.popup.querySelector('.kn-popup-header__title');
        this.replaceButtonClose();
        this.body = this.popup.querySelector('.kn-popup-body');
        this.buttonsCancel = this.popup.querySelectorAll('.kn-popup-button__close');
    }

    static openPopup() {
        this.popup.style.display = 'block';
        this.popup.dataset.open = true;
        knPopup.centerWindow.call(this);

        if(this.settings.background && this.background) {
            this.background.style.display = 'block';
        }

        if (window.GeneralContext && window.GeneralContext.postMessageToApp) {
            window.GeneralContext.postMessageToApp({
              type: window.GeneralContext.POST_MESSAGE_TYPES.TOGGLE_POPUP,
              isOpen: true,
            });
        }
    }

    static centerWindow() {
         if(!this.expanded) {
             const contentHeight = this.content.getBoundingClientRect().height;
             const contentWidth = this.content.getBoundingClientRect().width;
             const posTop = (window.innerHeight - contentHeight) / 2;
             const posLeft = (window.innerWidth - contentWidth) / 2;

             if(posTop > 0) {
                 this.content.style.top = posTop + 'px';
             }

             if(posLeft > 0) {
                 this.content.style.left = posLeft + 'px';
             }
         }
     }

     autoCenterWindow() {
         window.addEventListener('resize', () => {
             if(this.popup.dataset.open == 'true') {
                 knPopup.centerWindow.call(this);
             }
         });
     }

    replaceButtonClose () {
        const buttonCloseOld = this.popup.querySelector('.kn-popup-header__close');

        this.buttonClose = document.createElement('button');
        this.buttonClose.classList.add('kn-popup-header__close');
        this.buttonClose.innerHTML = buttonCloseOld.innerHTML;
        buttonCloseOld.parentNode.replaceChild(this.buttonClose, buttonCloseOld);
    }

    closePopup() {
        this.popup.style.display = 'none';
        this.popup.dataset.open = false;

        if (this.settings.onClose) {
            this.settings.onClose();
        }

        if(this.background) {
            this.background.style.display = 'none';
        }

        if (window.GeneralContext && window.GeneralContext.postMessageToApp) {
          window.GeneralContext.postMessageToApp({
            type: window.GeneralContext.POST_MESSAGE_TYPES.TOGGLE_POPUP,
            isOpen: false,
          });
        }
    }

    setTheme() {
        const elements = [
            this.content,
            this.header,
            this.headerTitle,
            this.buttonClose,
            this.body
        ];

        const classNameList = [
            'kn-popup-content',
            'kn-popup-header',
            'kn-popup-header__title',
            'kn-popup-header__close',
            'kn-popup-body'
        ];

        this.popup.classList.add('kn-popup');

        for(let i = 0, li = elements.length; i < li; i++) {
            if(elements[i]) {
                for(let j = 0, lj = classNameList.length; j < lj; j++) {
                    if(elements[i].classList.contains(classNameList[j])) {
                        elements[i].classList.add(classNameList[j] + '_theme_' + this.settings.theme);
                    }
                }
            }
        }
    }

    dragPopup() {
        this.dragabled = false;
        const _this = this;

        let posX = 0;
        let posY = 0;

        this.header.addEventListener('mousedown', mouseDown.bind(this), false);
        window.addEventListener('mouseup', mouseUp.bind(this), false);

        function mouseDown(event) {
            this.header.classList.add('kn-popup-header_dragable');
            posX = event.clientX - this.header.getBoundingClientRect().left;
            posY = event.clientY - this.header.getBoundingClientRect().top;
            window.addEventListener('mousemove', movePopup, true);
        }

        function mouseUp() {
            this.header.classList.remove('kn-popup-header_dragable');
            window.removeEventListener('mousemove', movePopup, true);
        }

        function movePopup(event) {
            if(!_this.expanded) {
                _this.dragabled = true;

                const documentHeight = document.body.clientHeight;
                const documentWidth = document.body.clientWidth;
                const contentPosY = parseInt(event.clientY - posY);
                const contentHeight =  parseInt(_this.content.getBoundingClientRect().height);
                const contentPosX = parseInt(event.clientX - posX);
                const contentWidth =  parseInt(_this.content.getBoundingClientRect().width);

                setPosition({
                    documentSize: documentHeight,
                    contentPos: contentPosY,
                    contentSize: contentHeight,
                    axis: 'top'
                });

                setPosition({
                    documentSize: documentWidth,
                    contentPos: contentPosX,
                    contentSize: contentWidth,
                    axis: 'left'
                });
            }
        }

        function setPosition(params) {
            if(params.contentPos <= 0) {
                _this.content.style[params.axis] = 0;
            }
            else if((params.contentPos + params.contentSize) >= params.documentSize) {
                _this.content.style[params.axis] = params.documentSize - params.contentSize + 'px';
            } else {
                _this.content.style[params.axis] = params.contentPos + 'px';
            }
        }
    }

    resizePopup() {
        const _this = this;
        const resizerTopLeft = createResizer('top_left', false);
        const resizerTopRight = createResizer('top_right', false);
        const resizerBottomLeft = createResizer('bottom_left', false);
        const resizerBottomRight = createResizer('bottom_right', true);

        let startWidth;
        let startHeight;
        let startTop;
        let startLeft;
        let startOffsetX;
        let startOffsetY;
        let minWidth;
        let minHeight;
        let startX;
        let startY;
        let currentWidth;
        let currentHeight;

        this.content.appendChild(resizerTopLeft);
        this.content.appendChild(resizerTopRight);
        this.content.appendChild(resizerBottomLeft);
        this.content.appendChild(resizerBottomRight);
        resizerTopLeft.addEventListener('mousedown', initResize.bind(this, 'top_left'), false);
        resizerTopRight.addEventListener('mousedown', initResize.bind(this, 'top_right'), false);
        resizerBottomLeft.addEventListener('mousedown', initResize.bind(this, 'bottom_left'), false);
        resizerBottomRight.addEventListener('mousedown', initResize.bind(this, 'bottom_right'), false);

        function createResizer(position, icon) {
            const resizer = document.createElement('div');

            if(icon) {
                const resizerIcon = `
                <svg class="kn-popup-resizer__icon" viewBox="0 0 20 20">
                    <path d="M0.6,19.9c-0.1,0-0.3,0-0.4-0.1c-0.2-0.2-0.2-0.5,0-0.7L19,0.3c0.2-0.2,0.5-0.2,0.7,0s0.2,0.5,0,0.7L1,19.7C0.9,19.8,0.8,19.9,0.6,19.9zM8.4,19.8L19.8,8.4c0.2-0.2,0.2-0.5,0-0.7s-0.5-0.2-0.7,0L7.7,19.1c-0.2,0.2-0.2,0.5,0,0.7c0.1,0.1,0.2,0.1,0.4,0.1S8.3,19.9,8.4,19.8z"/>
                </svg>`;

                resizer.innerHTML = resizerIcon;
            }

            resizer.classList.add('kn-popup-resizer', 'kn-popup-resizer_' + position);

            return resizer;
        }

        function initResize(type, event) {
            startX = event.clientX;
            startY = event.clientY;
            startOffsetX = event.offsetX;
            startOffsetY = event.offsetY;
            startWidth = this.content.getBoundingClientRect().width;
            startHeight = this.content.getBoundingClientRect().height;
            startTop = this.content.getBoundingClientRect().top;
            startLeft = this.content.getBoundingClientRect().left;

            if(minWidth === undefined) {
                minWidth = this.settings.minSize ? parseInt(this.settings.minSize.width) : startWidth;
            }

            if(minHeight === undefined) {
                minHeight = this.settings.minSize ? parseInt(this.settings.minSize.height) : startHeight;
            }

            switch(type) {
                case 'top_left': {
                    window.addEventListener('mousemove', doResizeTopLeft, false);
                    window.addEventListener('mouseup', stopResizeTopLeft, false);
                    break;
                }
                case 'top_right': {
                    window.addEventListener('mousemove', doResizeTopRight, false);
                    window.addEventListener('mouseup', stopResizeTopRight, false);
                    break;
                }
                case 'bottom_left': {
                    window.addEventListener('mousemove', doResizeBottomLeft, false);
                    window.addEventListener('mouseup', stopResizeBottomLeft, false);
                    break;
                }
                case 'bottom_right': {
                    window.addEventListener('mousemove', doResizeBottomRight, false);
                    window.addEventListener('mouseup', stopResizeBottomRight, false);
                    break;
                }
            }
        }

        function doResizeTopLeft(event) {
            if(!_this.expanded) {
                currentWidth = startWidth - event.clientX + startX - startOffsetX;
                currentHeight = startHeight - event.clientY + startY - startOffsetY;

                if(currentWidth >= minWidth) {
                    _this.content.style.width = currentWidth + 'px';
                    _this.content.style.left = event.clientX + 'px';
                }

                if(currentHeight >= minHeight) {
                    _this.content.style.height = currentHeight + 'px';
                    _this.content.style.top = event.clientY + 'px';
                }

                _this.content.classList.add('kn-popup-content_not-selected');
            }
        }

        function doResizeTopRight(event) {
            if(!_this.expanded) {
                currentWidth = startWidth + event.clientX - startX;
                currentHeight = startHeight - event.clientY + startY - startOffsetY;

                if(currentWidth >= minWidth) {
                    _this.content.style.width = currentWidth + 'px';
                }

                if(currentHeight >= minHeight) {
                    _this.content.style.height = currentHeight + 'px';
                    _this.content.style.top = event.clientY + 'px';
                }

                _this.content.classList.add('kn-popup-content_not-selected');
            }
        }

        function doResizeBottomLeft(event) {
            if(!_this.expanded) {
                currentWidth = startWidth - event.clientX + startX - startOffsetX;
                currentHeight = startHeight + event.clientY - startY;

                if(currentWidth >= minWidth) {
                    _this.content.style.width = currentWidth + 'px';
                    _this.content.style.left = event.clientX + 'px';
                }

                if(currentHeight >= minHeight) {
                    _this.content.style.height = currentHeight + 'px';
                }

                _this.content.classList.add('kn-popup-content_not-selected');
            }
        }

        function doResizeBottomRight(event) {
            if(!_this.expanded) {
                currentWidth = startWidth + event.clientX - startX;
                currentHeight = startHeight + event.clientY - startY;

                if(currentWidth >= minWidth) {
                    _this.content.style.width = currentWidth + 'px';
                }

                if(currentHeight >= minHeight) {
                    _this.content.style.height = currentHeight + 'px';
                }

                _this.content.classList.add('kn-popup-content_not-selected');
            }
        }

        function stopResizeTopLeft() {
            window.removeEventListener('mousemove', doResizeTopLeft, false);
            window.removeEventListener('mouseup', stopResizeTopLeft, false);
            _this.content.classList.remove('kn-popup-content_not-selected');
        }

        function stopResizeTopRight() {
            window.removeEventListener('mousemove', doResizeTopRight, false);
            window.removeEventListener('mouseup', stopResizeTopRight, false);
            _this.content.classList.remove('kn-popup-content_not-selected');
        }

        function stopResizeBottomLeft() {
            window.removeEventListener('mousemove', doResizeBottomLeft, false);
            window.removeEventListener('mouseup', stopResizeBottomLeft, false);
            _this.content.classList.remove('kn-popup-content_not-selected');
        }

        function stopResizeBottomRight() {
            window.removeEventListener('mousemove', doResizeBottomRight, false);
            window.removeEventListener('mouseup', stopResizeBottomRight, false);
            _this.content.classList.remove('kn-popup-content_not-selected');
        }
    }

    expandCollapsePopup() {
        this.expanded = false;

        const expander = createExpander();
        const collapser = createCollapser();

        let currentWidth;
        let currentHeight;
        let minWidth;
        let minHeight;
        let posX;
        let posY;

        this.header.appendChild(expander);
        this.header.appendChild(collapser);
        expander.classList.add('kn-popup_is-visible');
        expander.addEventListener('click', expand.bind(this), false);
        expander.addEventListener('mousedown', (event) => event.stopPropagation(), false);
        collapser.addEventListener('click', collapse.bind(this), false);
        collapser.addEventListener('mousedown', (event) => event.stopPropagation(), false);
        window.addEventListener('resize', setExpandSizes.bind(this), false);

        function createExpander() {
            const expander = document.createElement('button');
            const expanderIcon = `
            <svg class="kn-popup-expander__icon" viewBox="-538.5 545.7 20 20">
                <path d="M-522.3,548.9l-3.2-3.2h7v7l-3.2-3.2l-4.4,4.4l-0.5-0.5L-522.3,548.9zM-530.4,558.1l-0.5-0.5l-4.4,4.4l-3.2-3.2l0,7h7l-3.2-3.2L-530.4,558.1z"/>
            </svg>`;

            expander.innerHTML = expanderIcon;
            expander.classList.add('kn-popup-expander');

            return expander;
        }

        function createCollapser() {
            const collapser = document.createElement('button');
            const collapserIcon = `
            <svg class="kn-popup-collapser__icon" viewBox="-538.5 545.677 20 20">
                <path d="M-537.514,565.29l5.043-5.042l3.519,3.519v-7.626h-7.626l3.511,3.511l-5.043,5.043L-537.514,565.29zM-528.032,555.221h7.626l-3.519-3.519l5.043-5.043l-0.596-0.596l-5.043,5.043l-3.511-3.511V555.221z"/>
            </svg>`;

            collapser.innerHTML = collapserIcon;
            collapser.classList.add('kn-popup-collapser');

            return collapser;
        }

        function expand(event) {
            currentWidth = this.content.getBoundingClientRect().width;
            currentHeight = this.content.getBoundingClientRect().height;
            minWidth = this.settings.minSize ? parseInt(this.settings.minSize.width) : currentWidth;
            minHeight = this.settings.minSize ? parseInt(this.settings.minSize.height) : currentHeight;
            posX = this.content.getBoundingClientRect().top;
            posY = this.content.getBoundingClientRect().left;
            this.expanded = true;
            setExpandSizes.call(this);
            expander.classList.remove('kn-popup_is-visible');
            collapser.classList.add('kn-popup_is-visible');
        }

        function collapse(event) {
            setCollapseSizes.call(this);
            this.expanded = false;
            expander.classList.add('kn-popup_is-visible');
            collapser.classList.remove('kn-popup_is-visible');
        }

        function getExpandSizes() {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const indent = ((windowWidth / 100 * 3) + (windowHeight / 100 * 3)) / 2;

            const finalWidth = windowWidth > minWidth ? windowWidth - indent * 2 : minWidth;
            const finalHeight = windowHeight > minHeight ? windowHeight - indent * 2 : minHeight;

            const sizes = {
                width: finalWidth,
                height: finalHeight,
                top: indent,
                left: indent
            };

            return sizes;
        }

        function setExpandSizes() {
            if(this.expanded) {
                const expand = getExpandSizes();

                if(currentWidth >= minWidth) {
                    this.content.style.width = expand.width + 'px';
                }

                if(currentHeight >= minHeight) {
                    this.content.style.height = expand.height + 'px';
                }

                this.content.style.top = expand.top + 'px';
                this.content.style.left = expand.left + 'px';
            }
        }

        function setCollapseSizes() {
            this.content.style.top = posX + 'px';
            this.content.style.left = posY + 'px';
            this.content.style.width = currentWidth + 'px';
            this.content.style.height = currentHeight + 'px';
        }
    }

    /* scopeTab */

    hidden (element) {
        return (element.offsetWidth <= 0 && element.offsetHeight <= 0) || element.style.display === 'none';
    }

    visible (element) {
        let parentElement = element;

        while (parentElement) {
            if (parentElement === document.body) {
                break;
            }

            if (this.hidden(parentElement)) {
                return false;
            }

            parentElement = parentElement.parentNode;
        }

        return true;
    }

    focusable (element, isTabIndexNotNaN) {
        const nodeName = element.nodeName.toLowerCase();
        const res = (this.tabbableNode.test(nodeName) && !element.disabled) ||
                    (nodeName === 'a' ? element.href || isTabIndexNotNaN : isTabIndexNotNaN);

        return res && this.visible(element);
    }

    tabbable (element) {
        let tabIndex = element.getAttribute('tabindex');

        if (tabIndex === null) {
            const Undefined = void 0;

            tabIndex = Undefined;
        }

        const isTabIndexNaN = isNaN(tabIndex);

        return (isTabIndexNaN || tabIndex >= 0) && this.focusable(element, !isTabIndexNaN);
    }


    findTabbable (element) {
        return [].slice.call(element.querySelectorAll('*'), 0).filter(this.tabbable);


    }

    scopeTab (node, event) {
        const tabbable = this.findTabbable(node);

        if (!tabbable.length) {
            event.preventDefault();
            return;
        }

        const finalTabbable = tabbable[event.shiftKey ? 0 : tabbable.length - 1];
        const leavingFinalTabbable = finalTabbable === document.activeElement ||
        // handle immediate shift+tab after opening with mouse
        node === document.activeElement;

        if (!leavingFinalTabbable) {
            return;
        }

        event.preventDefault();
        const target = tabbable[event.shiftKey ? tabbable.length - 1 : 0];

        target.focus();
    }

    handleContentKeyDown (event) {
        if (event.keyCode === this.TAB_KEY) {
            this.scopeTab(this.content, event);
        }

        if (event.keyCode === this.ESC_KEY) {
            event.preventDefault();
            this.closePopup();
        }
    }

    /* scopeTab */
}
