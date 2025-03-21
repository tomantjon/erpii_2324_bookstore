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

        let oOrdersBinding = this.getView().getModel().bindList("/Orders");

        var oContext = oOrdersBinding.create({
          book_ID: ibookId,
          amount: 5,
        });
        //Hard refresh
        window.location.reload();
        // Note: This promise fails only if the transient entity is canceled,
        //   i.e. deleted by either deleting the transient context or by resetting pending changes
        oContext.created().then(
          function () {
            //Order Successfully created but the page cannot be refreshed -> API call to create an Order must be converted to an Action

            MessageToast.show("Order was posted");
            window.location.reload();
          },
          function (oError) {
            //Flight failed
            // handle rejection of entity creation; if oError.canceled === true then the transient entity has been deleted
            if (!oError.canceled) {
              throw oError; // unexpected error
            }
          }
        );
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
