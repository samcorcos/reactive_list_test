if (Meteor.isClient) {

  Session.set("listItems", ["test", "anoterh test"])

  Template.list.listItems = function() {
    return Session.get("listItems");
  }

  function add(item) {
    var list = Session.get("listItems");
    list.push(item);
    Session.set("listItems", list);
  }

  Template.list.events({
    "keypress input": function(e,t) {
      if (e.keyCode === 13) {
        var input = t.find("input");
        add(input.value);
        input.value = "";
      }
    }
  })

  function remove(item) {
    var list = Session.get("listItems");
    i = list.indexOf(item);
    if (i > -1) {
      Session.set("listItems", list.slice(0,i).concat(list.slice(i+1)));
    }
  }

  Template.item.events({
    "click": function(e,t) {
      remove(t.data);
    }
  })

}
