import { useState } from 'react';
import styled from 'styled-components';

interface Idata{
  id: number;
  title: string;
}

const StyledTable = styled.table`
  text-align: left;
  border-collapse: collapse;
  thead{
    tr{
      th{
        padding: 10px 15px;
        color: #fff;
        font-weight: 700;
      }
    }
  }
  tbody{
    tr{
      td{
        padding: 7px 15px;
        border-bottom: 1px solid #eee;
      }
    }
  }
  .second-row{
    width: 800px;
  }
`;

 function Sample() {
  const data = [
    {id: 0, title: '01. 어떤 일이 언제 일어났는지 기억하지 못할 때가 있다.'},
    {id: 1, title: '02.며칠 전에 들었던 이야기를 잊는다.'},
    {id: 2, title: '03.반복되는 일상 생활에 변화가 생겼을 때 금방 적응하기가 힘들다.'},
    {id: 3, title: '04.본인에게 중요한 사항을 잊을 때가 있다. (예를 들어 배우자 생일, 결혼 기념일 등)'},
    {id: 4, title: '05.어떤 일을 하고도 잊어버려 다시 반복한 적이 있다.'},
    {id: 5, title: '06.약속을 하고 잊은 때가 있다.'},
    {id: 6, title: '07.이야기 도중 방금 자기가 무슨 이야기를 하고 있었는지를 잊을 때가 있다.'},
    {id: 7, title: '08.약 먹는 시간을 놓치기도 한다.'},
    {id: 8, title: '09.하고 싶은 말이나 표현이 금방 떠오르지 않는다.'},
    {id: 9, title: '10.물건 이름이 금방 생각나지 않는다.'},
    {id: 10, title: '11.개인적인 편지나 사무적인 편지를 쓰기 힘들다.'},
    {id: 11, title: '12.갈수록 말수가 감소되는 경향이 있다.'},
    {id: 12, title: '13.신문이나 잡지를 읽을 때 이야기 줄거리를 파악하지 못한다.'},
    {id: 13, title: '14.책을 읽을 때 같은 문장을 여러 번 읽어야 이해가 된다.'},
    {id: 14, title: '15.텔레비전에 나오는 이야기를 따라 가기 힘들다.'},
    {id: 15, title: '16.전에 가본 장소를 기억하지 못한다.'},
    {id: 16, title: '17.길을 잃거나 헤맨 적이 있다.'},
    {id: 17, title: '18.계산 능력이 떨어졌다.'},
    {id: 18, title: '19.돈 관리를 하는 데 실수가 있다.'},
    {id: 19, title: '20.과거에 쓰던 기구 사용이 서툴러졌다.'},
  ];

  const [checkItems, setCheckItems] = useState([]);

  const handleSingleCheck = (checked: any, id: any) => {
    if (checked) {
      setCheckItems(prev => [...prev, id] as any);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  return (
    <StyledTable>
      <thead>
        <tr>
          <th className='second-row'>목록</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((data, key) => (
          <tr key={key}>
            <td>
              <input type='checkbox' name={`select-${data.id}`}
                onChange={(e) => handleSingleCheck(e.target.checked, data.id)}
                checked={checkItems.includes(data.id as never) ? true : false} />
            </td>
            <td className='second-row'>{data.title}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}

export default Sample;