/**
 * Created by lijie on 16/7/22.
 */
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './counterAction';

//reducer��ʵҲ�Ǹ���������,������state��action,����ֵ���µ�state
export default function counter(state = 0, action) {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return state + 1;
        case DECREMENT_COUNTER:
            return state - 1;
        default:
            return state
    }
}