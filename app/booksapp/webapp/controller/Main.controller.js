sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
  "use strict";

  return Controller.extend("my.booksapp.controller.Main", {
    onInit() {
      //   var oNewModel = {
      //     OrderNo: "2019-09...",
      //     Items: [{ book_ID: 201, amount: 5 }],
      //   };
      //   var oLocal = new JSONModel(oNewModel);
      //   this.getView().setModel(oLocal, "local");
    },

    handleItemPressed: function (oEvent) {
      let oContext = oEvent.getSource().getBindingContext();
      //get the BookID from the binded context item
      let iBookID = oContext.getProperty("ID");

      let oRouter = this.getOwnerComponent().getRouter();
      oRouter.navTo("BookDetailRoute", { bookID: iBookID });
    },
  });
});
