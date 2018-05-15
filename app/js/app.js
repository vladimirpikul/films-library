// checking localStorage data
if(localStorage.length){
    for(let i=0; i<localStorage.length; i++){
        if(localStorage.getItem('object'+i)){
            let retObj = JSON.parse(localStorage.getItem('object'+i));
            let index = $('.film-item').get(retObj.filmItem);
            $(index).find('.comments').append('<span>'+retObj.text+'</span>');
            $(index).find('.comment-count').text($(index).find('.comments').find('span').length);
        }
        if(localStorage.key(i).substr(0, 11) === 'newFilmItem'){
            $('.pattern').clone(true).removeClass('pattern').appendTo('.main-container');
            let newIndex = $('.film-item').get($('.film-item').length-1);
            let retObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
            $(newIndex).attr('id', Number(localStorage.key(i).substr(11)));

            $(newIndex).find('span.title').text(retObj.textTitle);
            $(newIndex).find('span.text').text(retObj.textDescription);
            $(newIndex).find('td.year').text(retObj.textYear);
            $(newIndex).find('td.country').text(retObj.textCountry);
            $(newIndex).find('td.genre').text(retObj.textGenre);
            $(newIndex).find('td.description').text(retObj.textDescription);
            $(newIndex).find('.poster').attr('src', retObj.textPoster);
            $(newIndex).find('.background-img').css('backgroundImage', 'url('+retObj.textPoster+')');
        }
    }
};

// dropdown menu for comment form
$('.drop-down').click(function() {
    $(this).closest('.film-item').find('.comment-form').toggleClass('open');
    $(this).find('i').toggleClass('rotate');
});

// adding new comment & counting comments
$('.add-btn').click(function () {
    let text = $(this).closest('.comment-form').find('input');
    if(text.val()){
        $(this).closest('.comment-form').find('.comments').append('<span>'+text.val()+'</span>');
        // adding comments to localeStorage
        for(let i=0; i<$('.film-item').length; i++){
            if($(this).closest('.film-item').get(0) === $('.film-item').get(i)){
                let obj = {
                    'filmItem': i,
                    'text': text.val()
                };
                let sObj = JSON.stringify(obj);
                localStorage.setItem('object'+localStorage.length, sObj);
            }
        }
        text.val('');
    }
    $(this).closest('.film-item').find('.comment-count').text($(this).closest('.comment-form').find('.comments').find('span').length);
});

// dropdown menu of add film form
$('.add-item').find('span').click(function() {
    $('.add-form').toggleClass('open');
    $('.circle').toggleClass('rotate');
});

// dropdown menu of edit film form
$('.edit-btn').click(function() {
    $(this).closest('.film-item').find('.edit-form').toggleClass('open');
    $(this).closest('.film-item').find('.comment-block').toggleClass('hide');
    $(this).closest('.film-item').find('.edit-form').find('input.title').val($(this).closest('.film-item').find('span.title').text());
    $(this).closest('.film-item').find('.edit-form').find('input.description').val($(this).closest('.film-item').find('span.text').text());
    $(this).closest('.film-item').find('.edit-form').find('input.year').val($(this).closest('.film-item').find('td.year').text());
    $(this).closest('.film-item').find('.edit-form').find('input.country').val($(this).closest('.film-item').find('td.country').text());
    $(this).closest('.film-item').find('.edit-form').find('input.genre').val($(this).closest('.film-item').find('td.genre').text());
    $(this).closest('.film-item').find('.edit-form').find('input.poster').val($(this).closest('.film-item').find('.poster').attr('src'));
});

// adding new film item
$('.add-film-item-btn').click(function () {
    $('.pattern').clone(true).removeClass('pattern').appendTo('.main-container');

    let newIndex = $('.film-item').get($('.film-item').length-1);

    let dataObj = {
        textTitle: $(this).closest('.add-form').find('input.title').val(),
        textYear: $(this).closest('.add-form').find('input.year').val(),
        textCountry: $(this).closest('.add-form').find('input.country').val(),
        textGenre: $(this).closest('.add-form').find('input.genre').val(),
        textPoster: $(this).closest('.add-form').find('input.poster').val(),
        textDescription: $(this).closest('.add-form').find('input.description').val()
    };

    $(newIndex).find('span.title').text(dataObj.textTitle);
    $(newIndex).find('span.text').text(dataObj.textDescription);
    $(newIndex).find('td.year').text(dataObj.textYear);
    $(newIndex).find('td.country').text(dataObj.textCountry);
    $(newIndex).find('td.genre').text(dataObj.textGenre);
    $(newIndex).find('.poster').attr('src', dataObj.textPoster);

    $(newIndex).find('.background-img').css('backgroundImage', 'url('+dataObj.textPoster+')');

    $(this).closest('.add-form').find('input').val('');

    let sObj = JSON.stringify(dataObj);
    $(newIndex).addClass('newFilmItem');

    if(localStorage.length === 0){
        localStorage.setItem('newFilmItem1', sObj);
        $(newIndex).attr('id', 1);
    } else for(let i=localStorage.length-1; i>=0; i--){
        if(localStorage.key(i).substr(0, 11) === 'newFilmItem'){
            localStorage.setItem('newFilmItem'+(Number(localStorage.key(i).substr(11))+1), sObj);
            $(newIndex).attr('id', Number(localStorage.key(i).substr(11))+1);
        break
        }
    }

    $('.add-form').toggleClass('open');
    $('.circle').toggleClass('rotate');
});

// save button
$('.save-btn').click(function () {
    $(this).closest('.film-item').find('.edit-form').toggleClass('open');
    $(this).closest('.film-item').find('.comment-block').toggleClass('hide');
    $(this).closest('.film-item').find('span.title').text($(this).closest('.film-item').find('.edit-form').find('input.title').val());
    $(this).closest('.film-item').find('span.text').text($(this).closest('.film-item').find('.edit-form').find('input.description').val());
    $(this).closest('.film-item').find('td.year').text($(this).closest('.film-item').find('.edit-form').find('input.year').val());
    $(this).closest('.film-item').find('td.country').text($(this).closest('.film-item').find('.edit-form').find('input.country').val());
    $(this).closest('.film-item').find('td.genre').text($(this).closest('.film-item').find('.edit-form').find('input.genre').val());
    $(this).closest('.film-item').find('.background-img').css('backgroundImage', 'url('+$(this).closest('.film-item').find('.edit-form').find('input.poster').val()+')');
    $(this).closest('.film-item').find('.poster').attr('src', $(this).closest('.film-item').find('.edit-form').find('input.poster').val());

    let dataObj = {
        textTitle: $(this).closest('.film-item').find('.edit-form').find('input.title').val(),
        textYear: $(this).closest('.film-item').find('.edit-form').find('input.year').val(),
        textCountry: $(this).closest('.film-item').find('.edit-form').find('input.country').val(),
        textGenre: $(this).closest('.film-item').find('.edit-form').find('input.genre').val(),
        textPoster: $(this).closest('.film-item').find('.edit-form').find('input.poster').val(),
        textDescription: $(this).closest('.film-item').find('.edit-form').find('input.description').val()
    };

    let sObj = JSON.stringify(dataObj);

    for(let i=0; i<localStorage.length-1; i++){
        if(localStorage.key(i).substr(11) === $(this).closest('.film-item').attr('id')){
            localStorage.setItem('newFilmItem'+(Number(localStorage.key(i).substr(11))), sObj);
        }
    }
});

// cancel button
$('.cancel-btn').click(function () {
    if((this) === $(this).closest('.add-form').find('.cancel-btn').get(0)){
        $(this).closest('.add-form').find('input').val('');
        $(this).closest('.add-form').toggleClass('open');
    } else {
        $(this).closest('.edit-form').find('input').val('');
        $(this).closest('.edit-form').toggleClass('open');
        $(this).closest('.film-item').find('.comment-block').toggleClass('hide');
    }
});

// deleting film block
$('.delete-btn').click(function () {
    if($(this).closest('.film-item').get(0)!== $('.template').get(0) && $(this).closest('.film-item').get(0)!== $('.template').get(1)){
        for(let i=0; i<localStorage.length; i++) {
            if (localStorage.key(i).substr(11) === $(this).closest('.film-item').attr('id')) {
                localStorage.removeItem(localStorage.key(i));
            }
        }
    }
    $(this).closest('.film-item').remove();
});