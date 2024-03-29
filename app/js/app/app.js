// SKELETON
/**
 * Application.
 *
 * This file is usually the "binding" of all of the individual Backbone.js
 * components into a unified whole. It is also typically *not* unit tested
 * because it has side effects from just running it. So, here is the expected
 * place to also do things like start Backbone.js History, do `$()` DOM
 * manipulation, etc.
 */
define([
  "jquery",
  "backbone",
  "app/models/employee",
  "app/collections/employees",

  // Import and compile a HBS template.
  // For real application, remove this import (and the real file) and replace
  // with imports for your Backbone components needed to bootstrap the full
  // application. Likely this means a collection and router.
  "hbs!app/templates/employee",

  // Polyfill JSON for old browsers.
  "json2"
], function (
  $,
  Backbone,
  EmployeeModel,
  EmployeeCollection,
  employeeTmpl
) {
  "use strict";

  // --------------------------------------------------------------------------
  // Backbone.js Components.
  // --------------------------------------------------------------------------
  // Let's write a very simple Backbone model, and bind that with a template
  // to a view.

  // Backbone.js Model
  //
  // The model contains the data. Typically this is sync'ed with remote or
  // local storage.
  // var HelloModel = Backbone.Model.extend({
  //   defaults: {
  //     message: "I am the default message"
  //   }
  // });

  model: new EmployeeModel();

  // var EmployeeModel = Backbone.Model.extend({
  //   defaults: {
  //     firstName: "",
  //     lastName: "",
  //     position: ""
  //   }
  // });

  var EmployeeView = Backbone.View.extend({
    //el: ".hello",
    template: employeeTmpl,
    initialize: function () {
      this.listenTo(this.model, "change", this.render);
    },
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  var EmployeesCollection = Backbone.Collection.extend({
    model: EmployeeModel
  });

  var EmployeesView = Backbone.View.extend({
    el: ".hello",
    template: employeeTmpl,
    initialize: function () {
      this.listenTo(this.collection, "change", this.render);
    },
    render: function () {
      var view = this;

      view.$el.empty();
      this.collection.each(function (model) {
        view.$el.append(view.template(model.toJSON()));
      });
      return this;
    }

  //   self.$el.empty();
  //   this.collection.each(function (model) {
  //     var employee = /* SOMETHING - BIND MODEL TO A VIEW */;
  //     employee.render();
  //     self.$el.append(employee.$el);
  //   });
  //
  //   return this;
  // }
  });

  // Backbone.js View
  // //
  // // The view binds model (or collection) data to a Handlebars template and
  // // attaches that to the page HTML. It also controls other behaviors.
  // var HelloView = Backbone.View.extend({
  //
  //   // HTML element to attach to.
  //   el: ".hello",
  //
  //   // Model data to use (unless one is passed to constructor).
  //   model: new HelloModel(),
  //
  //   // Template to bind data to.
  //   template: helloTmpl,
  //
  //   // Function to actually bind all of the above together.
  //   render: function () {
  //     // Get model JSON data,
  //     // Add to template and render,
  //     // Replace existing element HTML!
  //     this.$el.html(this.template(this.model.toJSON()));
  //
  //     // `render` should always return `this` by convention.
  //     return this;
  //   }
  // });

  // --------------------------------------------------------------------------
  // Adjustments **just** for this demo page.
  // --------------------------------------------------------------------------
  // Hide the existing Notes HTML content for our skeleton application.
  // This hide can be removed later, once you are using the HTML content
  // in `index.html`.
  $(".notes-html").hide();

  // Dynamically add our element for the Backbone.js view
  // (Usually done in actual HTML).
  $("<div class='hello' />").appendTo($("body"));

  // --------------------------------------------------------------------------
  // Application Bootstrap
  // --------------------------------------------------------------------------
  // Actually wire up and kick everything off!
  //
  // **Note**: The `app.js` file is usually just comprised of **imports**
  // of the individual Backbone.js components above and the below function
  // on page load.

  $(function () {
    var denzModel = new EmployeeModel({
        firstName: "Dennis",
        lastName: "Zzzz",
        position: "CEO"
      });

    var col = new EmployeesCollection([
      new EmployeeModel({
        firstName: "Dennis",
        lastName: "Zzzz",
        position: "CEO"
      }),
      new EmployeeModel({
        firstName: "Bob",
        lastName: "Smith",
        position: "IT Manager"
      })
    ]);

    var view = new EmployeesView({
      collection: col
    });

    view.render();
    view.collection.at(0).set("position", "the boss");
  });



    // var renderHtml = employeeTmpl(denz.toJSON());
    // $("body").append($(renderHtml));
    // window.console.log("TEMPLATE", renderHtml);


    // denzEmployee.on("change", function () {
    //   console.log("EMPLOYEE: " +
    // denzEmployee.get("firstName") + " " + denzEmployee.get("lastName"));
    // });
    //
    // denzEmployee.set("firstName", "Ryan");
    // denzEmployee.set("lastName", "ZZZZ");
    //
    //
    // //    denzEmployee
    // //    firstName: "Dennis",
    // //    lst name "DFDSFDS##$FE"
    // // });



  // $(function () {
  //   // Now instantiate our view and render!
  //   var helloView = new HelloView();
  //   // Update the model data. Without, renders `defaults.message`.
  //   helloView.model.set("message", "Hello World!");
  //   helloView.render();

});
