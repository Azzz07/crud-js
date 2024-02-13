using task as my from '../db/schema';

service ms {
@odata.draft.enabled
entity tab1 as projection on my.tab1;
entity tab2 as projection on my.tab2;
}
