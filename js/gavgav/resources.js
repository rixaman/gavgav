(function() {
    
    //Кэш ресурсов
    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    //Загрузка ресурсов которые передаются в виде массива.
    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        }
        else {
            _load(urlOrArr);
        }
    }

    //Загрузка одного конкретного ресурса
    function _load(url) {
        if(resourceCache[url]) {
            return resourceCache[url];
        }
        else {
            var img = new Image();
            img.onload = function() {
                resourceCache[url] = img;
                
                if(isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };
            resourceCache[url] = false;
            img.src = url;
        }
    }

    //Получить какой-то ресурс
    function get(url) {
        return resourceCache[url];
    }

    //Готова ли загрузка всего
    function isReady() {
        var ready = true;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    //Готово
    function onReady(func) {
        readyCallbacks.push(func);
    }

    //неведомая хуйня
    window.resources = { 
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();