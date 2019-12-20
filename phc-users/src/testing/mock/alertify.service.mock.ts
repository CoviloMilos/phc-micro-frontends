declare let alertify: any;
export class AlertifyServiceMock {

    success(message: string) {
        console.log('success');
    }

    error(message: string) {
        console.log('error');
    }

    warning(message: string) {
        console.log('warning');
    }

    message(message: string) {
        console.log('message');
    }
}