class Tag {
  constructor(id, name, new_dilemmas){
    this.id = id;
    this.name = name;
    this.dilemmas = [];
    for (var i = 0; i < new_dilemmas.length; i++){
      var new_dilemma = new Dilemma(new_dilemmas[i].id, new_dilemmas[i].name, new_dilemmas[i].deadline, new_dilemmas[i].author_id, new_dilemmas[i].tags);
      this.dilemmas.push(new_dilemma);
    }
    Tag.allInstances.push(this);
  }
}

Tag.allInstances = [];

function makeMainTagInstance(){
  var tag_id = $('#tag_show_page').attr('data-id');
  $.get("/tags/"+ tag_id + ".json", function(data){
    var tag = new Tag(data.id, data.name, data.dilemmas);
    makeTagShowPage(tag);
  });
}

function makeTagShowPage(tag){
  var template = Handlebars.compile($('#tag-show-template').html());
  var context = {tag_name: tag.name, tag_id: tag.id, dilemmas: []}
  for (var count = 0; count < tag.dilemmas.length; count++) {
    var dilemma = tag.dilemmas[count];
    var tags = dilemma.tags;
    context.dilemmas.push({dilemma_id: dilemma.id, dilemma_deadline: dilemma.prettyDeadline(), dilemma_name: dilemma.name, dilemmas_tags: []});
    for (var i = 0; i < tags.length; i++){
      context.dilemmas[count].dilemmas_tags.push({dilemma_tags_id: tags[i].id, dilemma_tags_name: tags[i].name});
    }
  }
  $('#tag_show_page').html(template(context));
}

$(document).ready(function(){
});