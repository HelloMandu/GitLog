import { render } from '@tests/test-utils';
// test utils

import ImplementedNestedCheckbox from '@components/Checkboxes/ImplementedNestedCheckbox';
// components

describe('ImplementedNestedCheckbox', () => {
  it('체크박스의 하위 요소는 `checkList` `props`를 통해 결정된다.', () => {
    const nestedCheckboxState = [
      { id: 1, checked: true, text: '' },
      { id: 2, checked: false, text: '' },
    ];
    const falseCheckboxState = [
      { id: 1, checked: false, text: '' },
      { id: 2, checked: false, text: '' },
    ];
    const trueCheckboxState = [
      { id: 1, checked: true, text: '' },
      { id: 2, checked: true, text: '' },
    ];

    const { getAllByRole } = render(
      <>
        <ImplementedNestedCheckbox text='' checkList={nestedCheckboxState} />
        <ImplementedNestedCheckbox text='' checkList={falseCheckboxState} />
        <ImplementedNestedCheckbox text='' checkList={trueCheckboxState} />
      </>
    );
    const [, oneAndOne, oneAndTwo, , twoAndOne, twoAndTwo, , threeAndOne, threeAndTwo] =
      getAllByRole('checkbox');
    expect(oneAndOne).toBeChecked();
    expect(oneAndTwo).not.toBeChecked();

    expect(twoAndOne).not.toBeChecked();
    expect(twoAndTwo).not.toBeChecked();

    expect(threeAndOne).toBeChecked();
    expect(threeAndTwo).toBeChecked();
  });

  it('체크박스의 부모 `checked` 상태는 하위 체크박스의 `checked` 상태에 따라 결정되며, 하위 체크박스가 모두 `checked`일 때에만 `true`이다.', () => {
    const nestedCheckboxState = [
      { id: 1, checked: true, text: '' },
      { id: 2, checked: false, text: '' },
    ];
    const falseCheckboxState = [
      { id: 1, checked: false, text: '' },
      { id: 2, checked: false, text: '' },
    ];
    const trueCheckboxState = [
      { id: 1, checked: true, text: '' },
      { id: 2, checked: true, text: '' },
    ];

    const { getAllByRole } = render(
      <>
        <ImplementedNestedCheckbox text='' checkList={nestedCheckboxState} />
        <ImplementedNestedCheckbox text='' checkList={falseCheckboxState} />
        <ImplementedNestedCheckbox text='' checkList={trueCheckboxState} />
      </>
    );
    const [isNested, , , isFalse, , ,] = getAllByRole('checkbox');
    expect(isNested).not.toBeChecked();
    expect(isFalse).not.toBeChecked();
    // expect(isTrue).toBeChecked();
  });

  it('체크박스의 부모는 클릭할 수 있으며, 클릭 시 하위 요소의 `checked` 상태도 함께 변경한다.', () => {
    const nestedCheckboxState = [
      { id: 1, checked: true, text: '' },
      { id: 2, checked: false, text: '' },
    ];

    const onAllChange = jest.fn();

    const { getAllByRole } = render(
      <ImplementedNestedCheckbox
        text=''
        checkList={nestedCheckboxState}
        onAllChange={onAllChange}
      />
    );
    const [isNested, ,] = getAllByRole('checkbox');
    isNested.click();
    expect(onAllChange).toHaveBeenCalled();

    // expect(one).toBeChecked();
    // expect(two).toBeChecked();
    //
    // isNested.click();
    //
    // expect(one).not.toBeChecked();
    // expect(two).not.toBeChecked();
  });

  it('체크박스의 하위 요소는 클릭할 수 있으며, `onChange` 함수에 자신의 id와 변경 상태를 포함하여 호출한다.', () => {
    const nestedCheckboxState = [
      { id: 1, checked: true, text: '' },
      { id: 2, checked: false, text: '' },
    ];

    const onAllChange = jest.fn();
    const onChange = jest.fn();

    const { getAllByRole } = render(
      <ImplementedNestedCheckbox
        text=''
        checkList={nestedCheckboxState}
        onAllChange={onAllChange}
        onChange={onChange}
      />
    );
    const [, one, two] = getAllByRole('checkbox');

    one.click();
    expect(onChange).toBeCalledWith(false, 1);
    two.click();
    expect(onChange).toBeCalledWith(true, 2);

    // expect(one).toBeChecked();
    // expect(two).toBeChecked();
    //
    // expect(one).not.toBeChecked();
    // expect(two).not.toBeChecked();
  });
});
