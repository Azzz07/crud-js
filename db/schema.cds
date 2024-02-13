namespace task;

entity tab1 { 
    key id : String;
    customerName: String;
    PoNumber: Integer;
    customerNumber: Integer;
    orderDate: String;
}
entity tab2 {
    key id : UUID;
    customerName: String;
    PoNumber: Integer;
    customerNumber: Integer;
    orderDate: String;
}
