import { useRef, useState, type ChangeEvent } from "react";
import axios from "axios";
import { Camera, ChefHat, Edit2, LogOut } from "lucide-react";
import type {
  UpdateProfilePayload,
  User,
} from "../services/recipeService";
import { uploadAvatar } from "../services/recipeService";

interface UserProfileCardProps {
  user: User | null;
  onUpdateProfile: (data: UpdateProfilePayload) => Promise<User>;
  onUserUpdated: (user: User) => void;
  onSignOut: () => void;
}

const emptyForm = { name: "", username: "", bio: "" };

export const UserProfileCard: React.FC<UserProfileCardProps> = ({
  user,
  onUpdateProfile,
  onUserUpdated,
  onSignOut,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const startEditing = () => {
    if (!user) return;
    setForm({ name: user.name, username: user.username, bio: user.bio });
    setError("");
    setSuccess("");
    setIsEditing(true);
  };

  const cancelEditing = () => {
    if (user) {
      setForm({ name: user.name, username: user.username, bio: user.bio });
    } else {
      setForm(emptyForm);
    }
    setError("");
    setAvatarPreview("");
    setIsEditing(false);
  };

  const handleAvatarChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file || !user) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Selecione uma imagem JPEG, PNG ou WebP.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("A imagem deve ter no máximo 5 MB.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
    setError("");
    setSuccess("");

    try {
      setIsUploadingAvatar(true);
      const uploadedImage = await uploadAvatar(file);
      onUserUpdated({
        ...user,
        avatarUrl: uploadedImage.url,
      });
      setSuccess("Foto atualizada com sucesso.");
    } catch (requestError) {
      console.error("Erro ao atualizar avatar:", requestError);
      setError(
        axios.isAxiosError(requestError)
          ? requestError.response?.data?.error ||
              "Não foi possível atualizar a foto."
          : "Não foi possível atualizar a foto.",
      );
    } finally {
      URL.revokeObjectURL(previewUrl);
      setAvatarPreview("");
      setIsUploadingAvatar(false);
    }
  };

  const saveProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    const username = form.username.trim().toLowerCase();

    if (!form.name.trim()) {
      setError("Nome é obrigatório.");
      return;
    }
    if (!/^[a-z0-9_]{1,20}$/.test(username)) {
      setError(
        "Username deve ter entre 1 e 20 caracteres e conter apenas letras, números e underscore.",
      );
      return;
    }
    if (form.bio.length > 200) {
      setError("A bio deve ter no máximo 200 caracteres.");
      return;
    }

    try {
      setIsSaving(true);
      setError("");
      const updatedUser = await onUpdateProfile({
        name: form.name.trim(),
        username,
        bio: form.bio,
      });
      onUserUpdated(updatedUser);
      setIsEditing(false);
      setSuccess("Perfil atualizado com sucesso.");
    } catch (requestError) {
      console.error("Erro ao atualizar perfil:", requestError);
      setError(
        axios.isAxiosError(requestError)
          ? requestError.response?.data?.error ||
              "Não foi possível atualizar o perfil."
          : "Não foi possível atualizar o perfil.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <aside className="w-full lg:w-80 shrink-0 bg-white p-6 rounded-2xl border border-black/10 flex flex-col items-center gap-6 text-center shadow-xs">
      <article className="flex flex-col items-center gap-4 w-full">
        <div className="relative">
          {isEditing ? (
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              disabled={isUploadingAvatar}
              className="relative block h-32 w-32 overflow-visible rounded-full border-2 border-zest/30 bg-orange-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-zest/50 disabled:cursor-not-allowed disabled:opacity-70 sm:h-40 sm:w-40 hover:cursor-pointer"
              aria-label="Selecionar foto do perfil"
            >
              {avatarPreview || user?.avatarUrl ? (
                <img
                  src={avatarPreview || user?.avatarUrl || ""}
                  alt={user?.name || "Foto de perfil"}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <span
                  role="img"
                  aria-label={user?.name || "Foto de perfil"}
                  className="flex h-full w-full items-center justify-center rounded-full text-zest"
                >
                  <ChefHat
                    className="h-16 w-16 stroke-[1.5] sm:h-20 sm:w-20"
                    aria-hidden="true"
                  />
                </span>
              )}

              <span className="absolute right-1 -bottom-0.5 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-zest text-white shadow-md">
                {isUploadingAvatar ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Camera className="h-4 w-4" aria-hidden="true" />
                )}
              </span>
            </button>
          ) : (
            <div className="h-32 w-32 overflow-hidden rounded-full border-2 border-zest/30 bg-orange-50 shadow-inner sm:h-40 sm:w-40">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name || "Foto de perfil"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  role="img"
                  aria-label={user?.name || "Foto de perfil"}
                  className="flex h-full w-full items-center justify-center text-zest"
                >
                  <ChefHat
                    className="h-16 w-16 stroke-[1.5] sm:h-20 sm:w-20"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
          )}

          <input
            ref={avatarInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        {isEditing ? (
          <form
            onSubmit={saveProfile}
            className="flex flex-col gap-3 w-full text-left"
          >
            <input
              aria-label="Nome"
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
              className="w-full px-3 py-2 rounded-lg border border-gray-300 font-spectral text-center"
              maxLength={100}
              required
            />
            <div className="flex items-center">
              <span className="px-3 py-2 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                @
              </span>
              <input
                aria-label="Username"
                value={form.username}
                onChange={(event) =>
                  setForm({ ...form, username: event.target.value.toLowerCase() })
                }
                className="min-w-0 flex-1 px-3 py-2 rounded-r-lg border border-gray-300 font-spectral"
                maxLength={20}
                required
              />
            </div>
            <textarea
              aria-label="Bio"
              value={form.bio}
              onChange={(event) => setForm({ ...form, bio: event.target.value })}
              maxLength={200}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 font-spectral resize-none"
            />
            <span className="text-xs text-gray-500 text-right">
              {form.bio.length}/200
            </span>
            {error && <p className="font-spectral text-sm text-red-600">{error}</p>}
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 py-2 rounded-lg bg-zest text-white font-spectral text-sm disabled:opacity-50 hover:cursor-pointer"
              >
                {isSaving ? "Salvando..." : "Salvar"}
              </button>
              <button
                type="button"
                onClick={cancelEditing}
                disabled={isSaving}
                className="flex-1 py-2 rounded-lg border border-gray-300 font-spectral text-sm disabled:opacity-50 hover:cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-1 w-full">
            <h1 className="font-aleo text-2xl sm:text-3xl font-medium text-zest">
              {user?.name || "Novo Cheffe"}
            </h1>
            <span className="font-spectral text-sm text-gray-500">
              @{user?.username || "cheffe_user"}
            </span>
            <p className="font-spectral text-sm text-gray-700 leading-relaxed mt-3">
              {user?.bio || "Adicione uma bio ao seu perfil."}
            </p>
            {success && <p className="font-spectral text-sm text-green-600">{success}</p>}
          </div>
        )}
      </article>

      <div className="flex flex-col gap-3 w-full">
        {!isEditing && (
          <button
            type="button"
            onClick={startEditing}
            className="w-full py-2.5 px-4 rounded-xl border border-zest text-zest font-spectral font-medium text-sm flex items-center justify-center gap-2 hover:bg-zest/5 transition-colors cursor-pointer"
          >
            <Edit2 className="w-4 h-4 stroke-2" />
            <span>Editar perfil</span>
          </button>
        )}
        <button
          type="button"
          onClick={onSignOut}
          className="w-full py-2.5 px-4 rounded-xl border border-red-500 text-red-600 font-spectral font-medium text-sm flex items-center justify-center gap-2 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 stroke-2" />
          <span>Sair da conta</span>
        </button>
      </div>
    </aside>
  );
};

export default UserProfileCard;
