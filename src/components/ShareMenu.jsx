// src/components/ShareMenu.jsx
import { useMemo, useState } from 'react'
import {
  IconButton, Button, Menu, MenuItem, ListItemIcon, ListItemText, Snackbar, Tooltip,
} from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

export default function ShareMenu({
  useIconButton = true,
  title = 'BABY Keyboard',
  text = 'Press a letter and hear a fun sound! 🎵',
  url,
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [copied, setCopied] = useState(false)
  const open = Boolean(anchorEl)
  const shareUrl = useMemo(
    () => url || (typeof window !== 'undefined' ? window.location.href : 'https://baby-keyboard.xyz/'),
    [url]
  )

  const onNativeShare = async () => {
    try { await navigator.share({ title, text, url: shareUrl }) } catch {}
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = shareUrl
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      try { document.execCommand('copy'); setCopied(true) } catch {}
      document.body.removeChild(textarea)
    }
    setAnchorEl(null)
  }

  const shareTwitter = () => {
    const t = encodeURIComponent(text)
    const u = encodeURIComponent(shareUrl)
    window.open(`https://twitter.com/intent/tweet?text=${t}&url=${u}`, '_blank', 'noopener,noreferrer')
    setAnchorEl(null)
  }

  const shareFacebook = () => {
    const u = encodeURIComponent(shareUrl)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${u}`, '_blank', 'noopener,noreferrer')
    setAnchorEl(null)
  }

  const supportsWebShare = typeof navigator !== 'undefined' && !!navigator.share

  if (supportsWebShare) {
    // ✅ 네이티브 공유 버튼도 small 사이즈로
    return (
      <>
        {useIconButton ? (
          <Tooltip title="공유하기">
            <IconButton size="small" color="primary" onClick={onNativeShare} aria-label="공유하기">
              <ShareIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          <Button size="small" variant="outlined" startIcon={<ShareIcon fontSize="small" />} onClick={onNativeShare}>
            공유하기
          </Button>
        )}
        <Snackbar
          open={copied}
          autoHideDuration={1800}
          onClose={() => setCopied(false)}
          message="링크가 복사되었습니다"
        />
      </>
    )
  }

  // ✅ 폴백 메뉴: dense + 여백/폰트/아이콘 크기 축소
  return (
    <>
      {useIconButton ? (
        <Tooltip title="공유하기">
          <IconButton
            size="small"
            color="primary"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            aria-label="공유하기"
          >
            <ShareIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : (
        <Button
          size="small"
          variant="outlined"
          startIcon={<ShareIcon fontSize="small" />}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          공유하기
        </Button>
      )}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        // ↓ MUI v5/v6 공통: 메뉴 리스트를 조밀하게
        MenuListProps={{ dense: true }}
        // ↓ 팝업 패널 전체에 컴팩트 스타일
        PaperProps={{
          sx: {
            '& .MuiMenuItem-root': {
              minHeight: 32,        // 기본 36~48 → 32로 축소
              py: 0.25, px: 1,      // 안쪽 여백 축소
            },
            '& .MuiListItemIcon-root': {
              minWidth: 28,         // 아이콘 공간 축소
            },
            '& .MuiSvgIcon-root': {
              fontSize: 18,         // 아이콘 자체도 조금 작게
            },
            '& .MuiListItemText-primary': {
              fontSize: '0.875rem', // 글자 크기 14px 정도
            },
          },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={shareTwitter}>
          <ListItemIcon><OpenInNewIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="트위터로 공유" />
        </MenuItem>
        <MenuItem onClick={shareFacebook}>
          <ListItemIcon><OpenInNewIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="페이스북으로 공유" />
        </MenuItem>
        <MenuItem onClick={copyLink}>
          <ListItemIcon><ContentCopyIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="링크 복사" />
        </MenuItem>
      </Menu>

      <Snackbar
        open={copied}
        autoHideDuration={1800}
        onClose={() => setCopied(false)}
        message="링크가 복사되었습니다"
      />
    </>
  )
}
