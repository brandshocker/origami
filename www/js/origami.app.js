INIT = function() {
    Navigation.create({
        target: 'navigation',
        maxWidth: 250,
        animation: '0.3s'
    });
    
    Navigation.run();
    
    document.addEventListener('deviceready', function () {
        if (window.cordova && StatusBar) {
            StatusBar.backgroundColorByHexString('#f0a818');
        }
    })
}; // function INIT 

window.addEventListener('load', INIT);