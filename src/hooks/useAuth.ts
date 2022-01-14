import { useCallback, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { User } from "../types/api/user";
import { useMessage } from "./useMessage";
import { useLoginUser } from "../hooks/useLoginUser"

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser()

  const [loading, setLoading] = useState(false);

  const login = useCallback((id: string) => {
    axios
      .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        if (res.data) {
          const isAdmin = res.data.id === 1 ? true : false;
          setLoginUser({ ...res.data, isAdmin});
          showMessage({ title: 'ログインが成功しました',status: "success" })
          history.push("/home");
        } else {
          showMessage({ title: 'ユーザーが見つかりません',status: "error" })
          setLoading(false);
        }
      })
      .catch(() => showMessage({ title: 'ログインできません',status: "error" }))
      setLoading(false);
  }, [history, showMessage, setLoginUser]);
  return { login, loading }
}