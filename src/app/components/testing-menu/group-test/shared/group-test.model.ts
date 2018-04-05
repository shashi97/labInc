
export class GroupTest {
  Id: number = 0;
  GroupTestName: string = '';
  GroupTestItems: Array<GroupTestItems> = new Array<GroupTestItems>();
}

export class GroupTestItems {
  Id: number = 0;
  GroupTestId: number = 0;
  TestingMenuId: number = 0;
  ItemName: string = '';
  ClassName: string = '';
}

export class TestItem {
  Id: number = 0;
  ItemName: string = '';
  ClassName: string = '';
  OralDetection: string = '';
  UrineDetection: string = '';
  TestingType: number = 0;
}
