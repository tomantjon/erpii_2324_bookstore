sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
  (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("my.booksapp.controller.BookDetail", {
      onInit() {
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter
          .getRoute("BookDetailRoute")
          .attachPatternMatched(this._onRouteMatched, this);
      },

      handleOrderPressed: function (oEvent) {
        console.log("Ordering the book");
        let ibookId = this.getView().byId("inBookID").getValue();

        this.getView()
          .byId("Submit")
          .getObjectBinding()
          .setParameter("book", ibookId)
          .setParameter("quantity", 5)
          .invoke()
          .then(
            function () {
              MessageToast.show("Book ordered");
            },
            function (oError) {
              MessageBox.alert(oError.message, {
                icon: MessageBox.Icon.ERROR,
                title: "Error",
              });
            }
          );
        this.getView().getModel().refresh();
      },

      _onRouteMatched: function (oEvent) {
        console.log("Route matched");
        let oArgs = oEvent.getParameter("arguments");
        let sBookId = oArgs.bookID;
        console.log(sBookId);

        let sBookPath = "/Books(" + sBookId + ")";
        this.getView().bindElement(sBookPath);
      },
    });
  }
);
