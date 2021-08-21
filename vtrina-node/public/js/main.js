export function loadingRequest(component){
    $('.spin').remove();
    $('.message').remove();
    $(`.${component}`).append(`
    <div class="mx-auto spin spinner-border text-info mt-3" role="status">
    
    </div>
    `);
}

export function message(color,message,component){
    $('.spin').remove();
    $('.message').remove();
    $(`.${component}`).append(`
    <div class="bounce-enter-active message alert alert-${color} alert-dismissible fade show" role="alert" style="margin-bottom:0px;">
    <strong>${message}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `);
}