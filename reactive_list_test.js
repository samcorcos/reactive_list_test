var People = new Mongo.Collection("people");

if (Meteor.isClient) {
  // Template.personList.people = function() {
  //   return People.find();
  // }
  // These two are the same thing.
  Template.personList.helpers({
    people: function() {
      return People.find();
    }
  })

  Template.personForm.events({
    'click button': function(e,t) {
      var el = t.find("#name");
      People.insert({ name: el.value});
      el.value = "";
    }
  })

  Template.person.helpers({
    editing: function() {
      return Session.get("edit-" + this._id);
    }
  })

  Template.person.events({
    'click .name': function(e,t) {
      Session.set("edit-" + t.data._id, true);
    },
    'keypress input': function(e,t) {
      if (e.keyCode === 13) {
        // Old code that has been replaced by lones 36 and 37:
        // Person.update(t.data, {$set: {name: e.currentTarget.value }});      // The reason for this is, "For code that runs on the client side/browser side you can only use an _id field as the query. On the server you can run it as you please.""
        var person = People.findOne(t.data);
        People.update({_id: person._id}, {$set: {name: e.currentTarget.value}});
        Session.set("edit-" + t.data._id, false);
      }
    },
    'click .del': function(e,t) {
      var person = People.findOne(t.data);
      People.remove(person._id);
    }
  })



}
