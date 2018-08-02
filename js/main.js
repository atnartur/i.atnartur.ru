const reopenModal = () => {
	if ($(window.location.hash).hasClass('modal'))
		$(window.location.hash).modal('toggle');
};

$(document).ready(() => {
    if(window.location.hash)
        reopenModal();

    $(window).bind('hashchange', () => reopenModal());

    $('.modal.project-view').on('hidden.bs.modal', () => location.hash = '_');

    $.get('http://atnartur.ru/atom.xml').then(res => {
        let entries = $(res).find('entry');
        for (let i = 0; i < 5 && i < entries.length; i++) {
            let entry = $(entries[i]);
            let link = entry.find('id').text();
            let title = entry.find('title').text();
            $('#blog_results').append(`<a href="${link}" target="_blank" class="list-group-item"><b>${title}</b></a>`);
        }
        $('#blog_latest').slideDown(500);
    });
});
