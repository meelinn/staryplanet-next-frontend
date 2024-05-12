import { BaseToast } from 'react-native-toast-message'

export const CustomSuccessToast = ({ pet_name }) => (
  <BaseToast
    style={{
      backgroundColor: '#69C779', // 设置背景颜色为绿色
      borderLeftColor: '#1F7A45', // 设置左边框颜色
    }}
    contentContainerStyle={{ paddingHorizontal: 15 }}
    text1Style={{
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFFFFF', // 设置文本颜色为白色
    }}
  />
)
