this.addEventListener('push', function (event) {
    var myNotif = event.data.json();
    console.log(myNotif);
    const promise = this.registration.showNotification(myNotif.notification.title, myNotif.notification);

    event.waitUntil(promise);
});

this.addEventListener('notificationclick', function (e) {
    var notification = e.notification;
    var action = e.action;

    if (action === 'close') {
        notification.close();
    } else {
        this.clients.openWindow('http://www.google.com');
        notification.close();
    }
});